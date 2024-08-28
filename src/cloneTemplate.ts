import chalk from "chalk";
import path from "path";
import simpleGit from "simple-git";
import os from "os";
import fs from "fs";
import { Answers } from "./types/cli";
import ora from "ora";
import { Git } from "./model/git";
import { ROOT_DIR } from "./constants";

const TEMPLATE_SRC = "git@github.com:jia8708/Tarobest.git";

export const cloneTemplate = async (answers: Answers) => {
	console.log("用户选择:", answers);
	const spinner = ora();
	spinner.start("正在匹配...");
	const localPath = path.join(os.tmpdir(), "taro-repo"); // 使用临时目录作为本地路径

	// 确保 localPath 目录存在
	if (!fs.existsSync(localPath)) {
		fs.mkdirSync(localPath, { recursive: true });
	}

	const git = new Git(TEMPLATE_SRC, localPath, answers);

	try {
		// 克隆仓库，但不检出任何分支
		await git.clone(".", ["--no-checkout"]);

		const branchNames = await git.getBranches();

		//遍历分支并检查 package.json
		for (const branch of branchNames) {
			if (branch === answers.template) {
				await git.checkout(branch);

				spinner.stop();
				console.log(chalk.green(`找到匹配的分支: ${branch}`));

				spinner.start("正在克隆...");
				const targetPath = path.join(ROOT_DIR, `${answers.name}`); // 假设你想克隆到当前工作目录
				await git.clone(targetPath, [
					"--single-branch",
					"--branch",
					branch,
					"--no-tags"
				]);
				console.log(
					chalk.green(`分支 ${branch} 已克隆到 ${targetPath}`)
				);
				spinner.stop();
				return;
			}
			// }

			await git.checkout("HEAD");
			await git.reset();
		}

		console.log(chalk.red("没有找到匹配的分支。"));
	} catch (error) {
		console.error(chalk.red("发生错误:"), error);
	} finally {
		spinner.stop();
		// 清理临时仓库目录
		if (fs.existsSync(localPath)) {
			await git.clean();
			await git.reset(["--hard"]);
			// 如果不再需要 localPath，可以删除它
			fs.rmSync(localPath, {
				recursive: true,
				force: true
			});
		}
	}
};
