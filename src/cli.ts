/* eslint-disable @typescript-eslint/no-explicit-any */
import { program } from "commander"
import inquirer from 'inquirer'
import os from 'os'
import path from "path"
import simpleGit from "simple-git"
import fs from 'fs'

import ora from "ora"
import chalk from "chalk"
import templates from "./tempateInfo"

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
      name: 'framework',
      message: '选择什么框架?',
      choices: ['React', 'Vue'],
    },
    {
      type: 'confirm',
      name: 'i18n',
      message: '是否使用i18n?',
    },
    {
      type: 'confirm',
      name: 'unocss',
      message: '是否使用unocss?',
    },
  ];
  inquirer.prompt(prompts  as any[]).then(async answers => {
  console.log('用户选择:', answers);
  const spinner = ora()
  spinner.start('正在匹配...');

  const localPath = path.join(os.tmpdir(), 'taro-repo'); // 使用临时目录作为本地路径

   // 确保 localPath 目录存在  
   if (!fs.existsSync(localPath)) {  
    fs.mkdirSync(localPath, { recursive: true });  
  }  

  function findFirstMatchingTemplateKey(answer:{[x:string]:any}, templates:{[x:string]:any}) {  
    // 使用 Object.keys 和 find 来找到第一个匹配的模板键  
    const matchingKey = Object.keys(templates).find(key => {  
      const template = templates[key];  
      // 检查 answer 的每个属性是否都与 template 的对应属性相等  
      return Object.keys(answer).every(prop => answer[prop] === template[prop]);  
    });  
    
    // 直接返回找到的匹配模板键  
    return matchingKey as string;  
  }  
    
    // 使用 simpleGit 克隆仓库
    const git = simpleGit({ baseDir: localPath });

    try {
      // 克隆仓库，但不检出任何分支
      await git.clone(TEMPLATE_SRC, '.', ['--no-checkout'])

      // 调用函数并打印结果  
      const branch = findFirstMatchingTemplateKey(answers, templates); 
      await git.checkout(branch);
  
      console.log(`找到匹配的分支: ${branch}`);

      spinner.start('正在克隆...')
      const targetPath = path.join(process.cwd(), `${branch}`); // 假设你想克隆到当前工作目录
      await git.clone(TEMPLATE_SRC, targetPath, ['--single-branch', '--branch', branch, '--no-tags']);
      console.log(`分支 ${branch} 已克隆到 ${targetPath}`);
      spinner.stop()
      
    } catch (error) {
      console.error(chalk.red('发生错误:'), error);
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