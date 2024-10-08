import { program } from "commander";
import inquirer from "inquirer";
import { SOURCE } from "./source";
import { Answers } from "./types/cli";
import { cloneTemplate } from "./clone-template";
import { ROOT_DIR } from "./constants";
import path from "path";
import TaroPlugins from "./plugins";
import { genarateConfig } from "./config";
import { genarateTemplate } from "./genarate-template";
import { print } from "./model/print";
import fs from "fs-extra";
import { exec } from "child_process";

export function createCli() {
	program.executableDir("../src/commands");
	// 创建项目
	program.command("create").action(async () => {
		const prompts = SOURCE;
		inquirer.prompt(prompts as any).then(async answers => {
			try {
				const temporarilyDir = path.join(ROOT_DIR, answers.name);
				const config = genarateConfig({
					answers: answers as Answers,
					root: temporarilyDir
				});
				if (!fs.existsSync(temporarilyDir)) {
					// 创建临时目录
					await fs.ensureDir(temporarilyDir);
				} else {
					print.red.error("项目已存在");
					process.exit(1);
				}
				// 调用插件
				const { plugins } = await TaroPlugins({
					root: temporarilyDir
				});
				plugins.forEach(async plugin => {
					if (plugin.beforeBuild) await plugin.beforeBuild();
				});
				// 检查本地模板是否存在
				if (config.localTemplate.includes(config.answers.template)) {
					await genarateTemplate(config);
				} else {
					await cloneTemplate(config);
				}
				plugins.forEach(async plugin => {
					if (plugin.beforeBuild) await plugin.afterBuild();
				});
			} catch (e) {
				console.log(e);
			}
		});
	});
	// 开发环境安装依赖
	program.command("install").action(() => {
		print.green.log("Begin install dependencies...");
		const templatePath = path.join(ROOT_DIR, "./src/template");
		const templates = fs.readdirSync(templatePath);
		const templateList = templates.map(template => {
			return path.resolve(templatePath, template);
		});
		templateList.forEach(async templatePath => {
			exec(`cd ${templatePath} && pnpm install`, (err, _stdout, stderr) => {
				if (err) {
					console.error(`exec error: ${err}`);
					return;
				}
				if (stderr) {
					console.error(`stderr: ${stderr}`);
					return;
				}
				console.log(`install dependencies in ${templatePath} success`);
			});
		})
	});
	program.parse(process.argv);
	return program;
}
