/* eslint-disable @typescript-eslint/no-explicit-any */
import { program } from "commander"
import inquirer from 'inquirer'
import os from 'os'
import path from "path"
import simpleGit from "simple-git"
import fs from 'fs'
import ora from "ora"

const TEMPLATE_SRC = 'git@github.com:jia8708/Tarobest.git'

program
  .name('tarobest')

program
    .command('pull')
    .description('拉取模板')
    .action(async ()=>{
        
const prompts = [
    {
      type: 'list',
      name: 'module',
      message: '请选择模板',
      choices: ['react','react-i18n','react-unocss','react-i18n-unocss','vue','vue-i18n','vue-unocss','vue-i18n-unocss'],
    },
    {
      type: 'confirm',
      name: 'renameFolder',
      message: '是否需要为模板重命名？',
      default: false
    },
    {
      type: 'input',
      name: 'folderName',
      message: '请输入文件夹名字：',
      when: (answers:{[x:string]:any}) => answers.renameFolder // 仅当用户选择重命名时显示此问题
    }
  ];
  inquirer.prompt(prompts  as any[]).then(async answers => {
  console.log('用户选择:', answers);
  const spinner = ora()
  spinner.start('正在匹配...');

  const localPath = path.join(os.tmpdir(), 'tarobest-repo'); // 使用临时目录作为本地路径

   // 确保 localPath 目录存在  
   if (!fs.existsSync(localPath)) {  
    fs.mkdirSync(localPath, { recursive: true });  
  }  
    
    // 使用 simpleGit 克隆仓库
    const git = simpleGit({ baseDir: localPath });

    try {
      // 克隆仓库，但不检出任何分支
      await git.clone(TEMPLATE_SRC, '.', ['--no-checkout'])

      // 调用函数并打印结果  
      const branch = answers['module']
      await git.checkout(branch);

      const targetFolderName = answers.renameFolder ? answers.folderName : branch;
      const targetPath = path.join(process.cwd(), targetFolderName);
  
      spinner.start('正在克隆...')

      await git.clone(TEMPLATE_SRC, targetPath, ['--single-branch', '--branch', branch, '--no-tags']);
      console.log(`分支 ${branch} 已克隆到 ${targetPath}`);
      spinner.stop()
      
    } catch (error) {
      console.error('发生错误:', error);
    } finally {
      spinner.stop()
      // 清理临时仓库目录
      if (fs.existsSync(localPath))   
        await git.clean('f', { cwd: localPath }); 
         
        // 如果不再需要 localPath，可以删除它  
         fs.rmSync(localPath, { recursive: true, force: true });  
      
    }
    
  });
})


    program.parse()