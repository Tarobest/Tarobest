import fs from "fs-extra";
import path from "path";
import { print } from "./model/print";

const filepath = path.join(__dirname, "data.json");
export async function deleteTemplate(name:string) {
	try {
		// 检查文件是否存在
		const fileExists = await fs
			.access(filepath)
			.then(() => true)
			.catch(() => false);

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
