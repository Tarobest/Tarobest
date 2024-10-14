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
import { copyTemplate } from "./copy-template";
import { exec } from "child_process";
import {addTemplate} from "./addTemplate";
import { deleteTemplate } from "./delTemplate";

export function createCli() {
	program.executableDir("../src/commands");
	program
		.command("create")
		.option("--name <name>", "Specify the folder name")
		.option("--description <description>", "describe the project")
		.option("--author <author>", "the author of the project")
		.option("--template <template>", "the resource of the project")
		.action(async options => {
			// 如果用户已经通过命令行提供了该选项的值，则不询问该问题
			const prompts = SOURCE.map(prompt => {
				if (Object.prototype.hasOwnProperty.call(options, prompt.name) && options[prompt.name] !== undefined)
					return null;
				return prompt;
			}).filter(prompt => prompt !== null);
			inquirer.prompt(prompts as any).then(async orgAnswers => {
				try {
					const answers = {
						...options,
						...orgAnswers
					};
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

					const regex = /^(\w+)\((\w+)\)$/;
					const match = regex.exec(answers.template);
					if (match) {
						if (fs.existsSync(match[2] as string)) await copyTemplate(match[2] as string, config.root);
						else await cloneTemplate(config);
					} else {
						if (config.localTemplate.includes(config.answers.template)) await genarateTemplate(config);
						else await cloneTemplate(config);
					}

					plugins.forEach(async plugin => {
						if (plugin.beforeBuild) await plugin.afterBuild();
					});
				} catch (e) {
					console.log(e);
				}
			});
		});

	program
		.command("add <name>")
		.option("-t, --templatePath <path>", "path to the template", `${process.cwd()}`)
		.action((name, options) => {
			const answers = { name: name, path: options.templatePath };
			// 调用函数
			addTemplate(answers);
		});

	program.command("delete <name>").action(name => {
		// 调用函数
		deleteTemplate(name);
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
		});
	});
	program.parse(process.argv);
	return program;
}
