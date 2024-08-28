import { program } from "commander";
import inquirer from "inquirer";
import os from "os";
import path from "path";
import simpleGit from "simple-git";
import fs from "fs";
import ora from "ora";
import chalk from "chalk";
import { SOURCE } from "./source";

const TEMPLATE_SRC = "git@github.com:jia8708/Tarobest.git";

export function createCli() {
	program.executableDir("../src/commands");

	program.command("pull").action(async () => {
		const prompts = SOURCE;
		inquirer.prompt(prompts as any).then(async answers => {
			console.log("用户选择:", answers);
			const spinner = ora();
			spinner.start("正在匹配...");

			const localPath = path.join(os.tmpdir(), "taro-repo"); // 使用临时目录作为本地路径

			// 确保 localPath 目录存在
			if (!fs.existsSync(localPath)) {
				fs.mkdirSync(localPath, { recursive: true });
			}

			// 定义 checkTemplateInfoMatches 函数以比较 package.json 中的 templateInfo
			// const checkTemplateInfoMatches = (
			// 	packageJsonObj: { [x: string]: any },
			// 	answers: { [x: string]: any }
			// ) => {
			// 	const templateInfo = packageJsonObj.templateInfo || {};
			// 	const lists = ["typescript", "css", "framework", "i18n"];
			// 	for (const list of lists) {
			// 		if (templateInfo[list] !== answers[list]) {
			// 			return false;
			// 		}
			// 	}
			// 	return true;
			// };

			// 使用 simpleGit 克隆仓库
			const git = simpleGit({ baseDir: localPath });

			try {
				// 克隆仓库，但不检出任何分支
				await git.clone(TEMPLATE_SRC, ".", ["--no-checkout"]);

				const branches = await git.branch(["--all"]);

				const branchNames = branches.all.map(branch =>
					branch.replace(/^remotes\/origin\//, "")
				);
				console.log(branchNames, 11);

				//遍历分支并检查 package.json
				for (const branch of branchNames) {
					await git.checkout(branch);

					// const packageJsonPath = path.join(
					// 	localPath,
					// 	"package.json"
					// );

					// if (fs.existsSync(packageJsonPath)) {
						// const packageJsonContent = fs.readFileSync(
						// 	packageJsonPath,
						// 	"utf8"
						// );
						// const packageJsonObj =
						// 	JSON.parse(packageJsonContent);

						if (
							branch === answers.template
						) {
							spinner.stop();
							console.log(
								chalk.green(`找到匹配的分支: ${branch}`)
							);

							spinner.start("正在克隆...");
							const targetPath = path.join(
								process.cwd(),
								`${branch}`
							); // 假设你想克隆到当前工作目录
							await git.clone(TEMPLATE_SRC, targetPath, [
								"--single-branch",
								"--branch",
								branch,
								"--no-tags"
							]);
							console.log(
								chalk.green(
									`分支 ${branch} 已克隆到 ${targetPath}`
								)
							);
							spinner.stop();
							return;
						}
					// }

					await git.checkout("HEAD");
					await git.reset(["--hard"]);
				}

				console.log(chalk.red("没有找到匹配的分支。"));
			} catch (error) {
				console.error(chalk.red("发生错误:"), error);
			} finally {
				spinner.stop();
				// 清理临时仓库目录
				if (fs.existsSync(localPath)) {
					await git.clean("f", { cwd: localPath });
					await git.reset(["--hard"]);
					// 如果不再需要 localPath，可以删除它
					fs.rmSync(localPath, {
						recursive: true,
						force: true
					});
				}
			}
		});
	});

	program.parse();
	return program;
}
