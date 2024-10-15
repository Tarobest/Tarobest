import path from "path";
import { Answers } from "./types/cli";
import { resolvePlatForm } from "./utils/resolve-platForm";

export type BaseTemplate = "react" | "vue";
export interface Extra {
	useI18n?: boolean;
	[key: string]: boolean | undefined;
}
export interface TConfig {
	platform: "macOS" | "Windows" | "Linux" | "other";
	answers: Answers;
	root: string;
	localTemplate: string[];
	templateRoot: string;
	baseRoot: BaseTemplate;
	extra: Extra;
}

const localTemplate: string[] = ["react", "react-i18n"];

export const genarateConfig = ({ answers, root }: { answers: Answers; root: string }) => {
	const templateRoot = path.join(__dirname, "./template", answers.template);
	const baseRoot: Record<string, BaseTemplate> = {
		react: "react",
		"react-i18n": "react"
	};
	let extra: Extra = {};
	if (answers.template === "react-i18n") {
		extra.useI18n = true;
	}
	return {
		platform: resolvePlatForm(), // 平台
		answers: answers, // 选择的模板
		root: root, // 项目根目录
		templateRoot, // 模版根目录
		baseRoot:baseRoot[answers.template]?path.join(__dirname, "./template", baseRoot[answers.template]):"", // 基础模版目录
		localTemplate, // 本地模板
		extra
	} as TConfig;
};
