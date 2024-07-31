import { program } from "commander"
import inquirer from 'inquirer'
import os from 'os'
import path from "path"
import simpleGit from "simple-git"
import fs from 'fs'

const TEMPLATE_SRC = 'github:NervJS/taro-project-templates#v4.0'

program.executableDir('../src/commands')

program
    .command('pull')
    .action(async ()=>{
        
const prompts = [
    {
      type: 'list',
      name: 'css',
      message: '选择哪种CSS预处理器?',
      choices: ['无', 'Sass', 'Less'],
    },
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
        name: 'typescript',
        message: '是否使用typescript?',
      },
  ];
  const localPath = path.join(os.tmpdir(), 'taro-repo'); // 使用临时目录作为本地路径

   // 确保 localPath 目录存在  
   if (!fs.existsSync(localPath)) {  
    fs.mkdirSync(localPath, { recursive: true });  
  }  

  inquirer.prompt(prompts  as any[]).then(async answers => {
    console.log('用户选择:', answers);

    // 定义 checkTemplateInfoMatches 函数以比较 package.json 中的 templateInfo
    const checkTemplateInfoMatches = (packagePath:string, answers:{[x:string]:any}) => {
      const packageJson = require(packagePath);
      const templateInfo = packageJson.templateInfo || {};
      return Object.keys(answers).every(key => templateInfo[key] === answers[key]);
    };

    // 使用 simpleGit 克隆仓库
    const git = simpleGit({ baseDir: localPath });

    try {
      // 克隆仓库，但不检出任何分支
      await git.clone(TEMPLATE_SRC, localPath, ['--no-checkout']);

      // 获取所有分支名称
      const branches = await git.branch(['--remote', '--format=%(name)']);
      const branchNames = branches.all;

      // 遍历分支并检查 package.json
      for (const branch of branchNames) {
        await git.checkout(branch);
        const packageJsonPath = path.join(localPath, 'package.json');

        if (fs.existsSync(packageJsonPath) && checkTemplateInfoMatches(packageJsonPath, answers)) {
          console.log(`找到匹配的分支: ${branch}`);
          const targetPath = process.cwd(); // 假设你想克隆到当前工作目录
          await git.clone(TEMPLATE_SRC, targetPath, ['--single-branch', '--branch', branch, '--no-tags']);
          console.log(`分支 ${branch} 已克隆到 ${targetPath}`);
          return; // 找到匹配的分支后退出循环
        }
        // 重置工作目录，为下一个分支检查做准备
        await git.checkout('HEAD');
        await git.reset(['--hard']);
      }

      console.log('没有找到匹配的分支。');
    } catch (error) {
      console.error('发生错误:', error);
    } finally {
      // 清理临时仓库目录
      await git.clean('-fdx');
      await git.reset(['--hard']);
    }
  });

    })

program
    .command('print','测试')

    program.parse()