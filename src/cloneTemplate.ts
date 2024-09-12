import ora from "ora";
import { Git } from "./model/git";
import {  TEMPLATE_SRC } from "./constants";
import { print } from "./model/print";
import { TConfig} from "./config";

export const cloneTemplate = async (config: TConfig) => {
	const {answers} = config;
	const spinner = ora();
	const temporarilyDir = config.root

	const git = new Git(TEMPLATE_SRC, temporarilyDir, answers);

	await cloneBranch(git, spinner, config);
};
// 克隆分支
async function cloneBranch(
	git: Git,
	spinner: ora.Ora,
	config: TConfig
) {
	spinner.start("正在克隆...");
	try {
		const targetPath = config.root; // 克隆到当前工作目录

		await git.clone(targetPath, ["--no-checkout"]);
		const branchNames = await git.getBranches();
		const branch = branchNames.filter(b => b === config.answers.template)[0];

		await git.ensureBranch(branch);

		spinner.stop();
	} catch (error) {
		print.red.error(`克隆失败: ${error}`);
	} finally {
		spinner.stop();
	}
}
