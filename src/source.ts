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
		choices: ["react", "react-i18n", "vue", "vue-i18n"]
	}
];
