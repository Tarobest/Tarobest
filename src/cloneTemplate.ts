import path from "path";
import os from "os";
import fs from "fs-extra";
import { Answers } from "./types/cli";
import ora from "ora";
import { Git } from "./model/git";
import { ROOT_DIR } from "./constants";
import { print } from "./model/print";
import { Genarate } from "./model/genarate";

const TEMPLATE_SRC = "git@github.com:Tarobest/Tarobest.git";

export const cloneTemplate = async (answers: Answers) => {
	console.log("用户选择:", answers);
	const spinner = ora();
	const temporarilyDir = path.join(ROOT_DIR, answers.name);
	if (!fs.existsSync(temporarilyDir)) {
		// 创建临时目录
		await fs.ensureDir(temporarilyDir);
	} else {
		print.red.error("项目已存在");
		process.exit(1);
	}
	spinner.start("正在克隆...");

	const git = new Git(TEMPLATE_SRC, temporarilyDir, answers);
	const genarate = new Genarate(answers);

	await cloneBranch(git, spinner, answers, async () => {
		await genarate.genaratePkg();
	});
};
// 克隆分支
async function cloneBranch(
	git: Git,
	spinner: ora.Ora,
	answers: Answers,
	callback: any = () => {}
) {
	try {
		const targetPath = path.join(ROOT_DIR, `${answers.name}`); // 假设你想克隆到当前工作目录

		await git.clone(targetPath, ["--no-checkout"]);
		const branchNames = await git.getBranches();
		const branch = branchNames.filter(b => b === answers.template)[0];

		spinner.stop();

		await git.ensureBranch(branch);
		await callback();
		spinner.stop();

		print.green.log(`分支 ${branch} 已克隆到 ${targetPath}`);

		await git.reset();
	} catch (error) {
		print.red.error(`克隆失败: ${error}`);
	} finally {
		spinner.stop();
	}
}
