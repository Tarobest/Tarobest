import { Answers } from "./types/cli";
//import { isLocalPath } from "./utils/match-pathType";
import fs from "fs";
import path from "path";
import { print } from "./model/print";

const dir = path.join(__dirname, "data.json");
const tbTemplate = ["react", "react-i18n", "vue", "vue-i18n"];

export const SOURCE = [
	{
		type: "input",
		name: "name",
		message: "请输入项目名称"
	},
	{
		type: "input",
		name: "description",
		message: "请输入项目描述"
	},
	{
		type: "input",
		name: "author",
		message: "请输入作者"
	},
	{
		type: "list",
		name: "template",
		message: "请选择模版",
		choices: async () => {
			if (!fs.existsSync(dir)) {
				return tbTemplate;
			} else {
				const data = await fs.promises.readFile(dir, "utf8");
				const jsonObject = JSON.parse(data);
				const templateNamesAndPaths = [];
				for (const key in jsonObject) {
					if (Object.prototype.hasOwnProperty.call(jsonObject, key)) {
						const element = jsonObject[key];
						const templateInfo = `${element.name}(${element.path})`;
						templateNamesAndPaths.push(templateInfo);
					}
				}
				return [...tbTemplate,...templateNamesAndPaths];

			}
		}
	}
];


