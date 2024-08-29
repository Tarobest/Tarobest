import path from "path";
import fs from "fs-extra";
import { Answers } from "./types/cli";
import ora from "ora";
import { Git } from "./model/git";
import { ROOT_DIR, TEMPLATE_SRC } from "./constants";
import { print } from "./model/print";
import { GenarateReact, Genarate } from "./model/genarate";
import TaroPlugins from "./plugins";

export const cloneTemplate = async (answers: Answers) => {
	console.log("用户选择:", answers);
	const spinner = ora();
	const temporarilyDir = path.join(ROOT_DIR, answers.name);
	// 调用插件
	const { plugins } = await TaroPlugins();
	plugins.forEach(async plugin => {
		if (plugin.beforeBuild) await plugin.beforeBuild();
	});
	if (!fs.existsSync(temporarilyDir)) {
		// 创建临时目录
		await fs.ensureDir(temporarilyDir);
	} else {
		print.red.error("项目已存在");
		process.exit(1);
	}
	spinner.start("正在克隆...");

	const git = new Git(TEMPLATE_SRC, temporarilyDir, answers);

	await cloneBranch(git, spinner, answers);
	plugins.forEach(async plugin => {
		if (plugin.beforeBuild) await plugin.afterBuild();
	});
};
// 克隆分支
async function cloneBranch(git: Git, spinner: ora.Ora, answers: Answers) {
	const genarate = new GenarateReact(answers);

	try {
		const targetPath = path.join(ROOT_DIR, `${answers.name}`); // 克隆到当前工作目录

		await git.clone(targetPath, ["--no-checkout"]);
		const branchNames = await git.getBranches();
		const branch = branchNames.filter(b => b === answers.template)[0];

		await git.ensureBranch(branch);
		await genarate.genaratePkg();

		spinner.stop();

		print.green.log(`分支 ${branch} 已克隆到 ${targetPath}`);
	} catch (error) {
		print.red.error(`克隆失败: ${error}`);
	} finally {
		spinner.stop();
	}
}

async function genarateTemplate(genarate: Genarate, spinner: ora.Ora) {
	spinner.start("正在生成模板...");
	await genarate.genaratePkg();
	await genarate.genarateWxConfig();
	await genarate.genaratePages();
	spinner.stop();
;
}