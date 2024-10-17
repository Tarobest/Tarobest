import fs from "fs-extra";
import path from "path";
import { AddAns } from "./types/cli";
import { print } from "./model/print";
import ora from "ora";
import { Git } from "./model/git";
import { TEMPLATE_SRC } from "./constants/index";
import { TConfig } from "./config";

export async function addTemplate(answers: AddAns) {
	const filepath = path.join(__dirname, "data.json");
	try {
		// 检查文件是否存在
		const fileExists = await fs.existsSync(filepath);

		let jsonArray;
		if (fileExists) {
			// 文件存在，读取文件内容
			const orgData = await fs.promises.readFile(filepath, "utf8");
			jsonArray = JSON.parse(orgData);
		} else {
			jsonArray = [];
		}

		// 向数组中添加新对象
		jsonArray.push(answers);

		await fs.promises.writeFile(filepath, JSON.stringify(jsonArray, null, "\t"), "utf8");

		print.green.log("添加成功");
	} catch (error) {
		console.error("Error writing to file:", error);
	}
}

// 通过git clone 模板
export const cloneTemplate = async (config: TConfig) => {
	const { answers } = config;
	const spinner = ora();
	const temporarilyDir = config.root;
	const regex = /^(\w+)\((\w+)\)$/;
	const match = regex.exec(answers.template);
	const orgPath = match ? String(match[2]) : TEMPLATE_SRC;
	const git = new Git(orgPath, temporarilyDir, answers);
	await cloneBranch(git, spinner, config);
};
// 克隆分支
async function cloneBranch(git: Git, spinner: ora.Ora, config: TConfig) {
	spinner.start("正在克隆...");
	try {
		const targetPath = config.root; // 克隆到当前工作目录

		await git.clone(targetPath, ["--no-checkout"]);
		const branchNames = await git.getBranches();
		const branch = branchNames.filter(b => b === config.answers.template)[0];

		await git.ensureBranch(branch);

		spinner.stop();
		print.green.log("创建完成");
	} catch (error) {
		print.red.error(`克隆失败: ${error}`);
	} finally {
		spinner.stop();
	}
}


export async function copyTemplate(originPath: string, copyPath: string) {
	const spinner = ora();
	spinner.start("正在克隆...");
	try {
		// 读取文件信息
		const dirInfo = await fs.readdir(originPath, { withFileTypes: true });

		// 创建文件夹
		await fs.mkdir(copyPath, { recursive: true });

		// 遍历目录信息
		for (const entry of dirInfo) {
			// 拼接当前文件路径
			const originFilePath = path.join(originPath, entry.name);
			// 拼接目标文件路径
			const copyFilePath = path.join(copyPath, entry.name);

			// 判断是否是文件夹
			if (entry.isDirectory()) {
				// 如果是文件夹，递归调用 copyDir
				await copyTemplate(originFilePath, copyFilePath);
			} else {
				// 如果不是文件夹，异步复制文件
				await fs.copyFile(originFilePath, copyFilePath);
			}
		}
	} catch (error) {
		print.red.error(`克隆失败: ${error}`);
	} finally {
		spinner.stop();
	}
}

export async function deleteTemplate(name: string) {
	const filepath = path.join(__dirname, "data.json");
	try {
		// 检查文件是否存在
		const fileExists = await fs.existsSync(filepath);

		if (fileExists) {
			// 文件存在，读取文件内容
			const orgData = await fs.readFile(filepath, "utf8");
			const jsonArray = JSON.parse(orgData);

			// 确保 jsonArray 是一个数组
			if (!Array.isArray(jsonArray)) throw new Error("文件内容不是一个有效的 JSON 数组");

			// 找到与给定 name 相匹配的对象的索引
			const index = jsonArray.findIndex(entry => entry.name === name);

			if (index !== -1) {
				// 从数组中删除该对象
				jsonArray.splice(index, 1);

				// 将更新后的数组写回文件
				await fs.writeFile(filepath, JSON.stringify(jsonArray, null, "\t"), "utf8");

				print.green.log(`${name} 已被删除`);
			} else {
				print.red.error(`未找到名为 ${name} 的条目`);
			}
		} else {
			// 文件不存在
			throw new Error("文件不存在");
		}
	} catch (error) {
		console.error("发生错误:", error);
	}
}
