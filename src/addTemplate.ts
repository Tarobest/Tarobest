import fs from "fs-extra";
import path from "path";
import { addAns } from "./types/cli";
import { print } from "./model/print";

const filepath = path.join(__dirname, "data.json");
export async function addTemplate(answers: addAns) {
	try {
		// 检查文件是否存在
		const fileExists = await fs
			.access(filepath)
			.then(() => true)
			.catch(() => false);

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


