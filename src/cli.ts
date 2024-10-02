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
import { spawn } from "child_process";

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

	program.command("install").action(() => {
		print.green.log("Begin install dependencies...");

		const child = spawn("node", ["./src/utils/install-template-dependencies"], {
			cwd: ROOT_DIR,
			stdio: "pipe",
			shell: true
		});

		child.stdout.on("data", data => {
			process.stdout.write(data);
		});

		child.stderr.on("data", data => {
			print.red.error(data.toString());
		});

		// 处理子进程退出
		child.on("close", code => {
			if (code !== 0) print.red.error(`Child process exited with code ${code}`);
			else print.green.log("install all dependencies success");
		});

		child.on("error", err => {
			print.red.error(`Open child process error: ${err}`);
		});
	});
	program.parse(process.argv);
	return program;
}
