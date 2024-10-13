import fs from "fs-extra";
import path from "path";
import ora from "ora";
import { print } from "./model/print";

const spinner = ora();
export async function copyTemplate (originPath: string, copyPath: string) {
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
