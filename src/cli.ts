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

	program.command("add <name> <templatePath>").action((name, templatePath) => {
		const answers = { name: name, path: templatePath };
		const filepath = path.join(__dirname, "data.json");
		async function writeAnswers() {
			try {
				// 检查文件是否存在
				const fileExists = await fs
					.access(filepath)
					.then(() => true)
					.catch(() => false);

				let jsonObject;
				if (fileExists) {
					// 文件存在，读取文件内容
					const orgData = await fs.readFile(filepath, "utf8");
					jsonObject = JSON.parse(orgData);
				} else {
					// 文件不存在，初始化为空对象
					jsonObject = {};
				}

				// 确保 jsonObject 是一个对象
				if (typeof jsonObject !== "object" || Array.isArray(jsonObject))
					throw new Error("文件内容不是一个有效的 JSON 对象");

				// 找到下一个键值
				const maxKey = Math.max(...Object.keys(jsonObject).map(Number), 0) + 1;
				const newKey = String(maxKey);

				// 向对象中添加新对象
				jsonObject[newKey] = answers;

				// 将更新后的对象写回文件
				await fs.writeFile(filepath, JSON.stringify(jsonObject, null, "\t"), "utf8");

				print.green.log("添加成功");
			} catch (error) {
				console.error("Error writing to file:", error);
			}
		}
		// 调用函数
		writeAnswers();
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
