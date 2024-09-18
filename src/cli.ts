import { program } from "commander";
import inquirer from "inquirer";
import { SOURCE } from "./source";
import { Answers } from "./types/cli";
import { cloneTemplate } from "./cloneTemplate";
import { ROOT_DIR } from "./constants";
import path from "path";
import TaroPlugins from "./plugins";
import { genarateConfig } from "./config";
import { genarateTemplate } from "./genarateTemplate";
import { print } from "./model/print";
import fs from "fs-extra";

export function createCli() {
	program.executableDir("../src/commands");

	program.command("init").action(async () => {
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

	program.parse(process.argv);
	return program;
}
