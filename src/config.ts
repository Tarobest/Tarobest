import path from "path";
import { Answers } from "./types/cli";
import { resolvePlatForm } from "./utils/resolvePlatForm";

export interface TConfig {
	platform: "macOS" | "Windows" | "Linux" | "other";
	answers: Answers;
	root: string;
	localTemplate: string[];
	templateRoot: string;
}

const localTemplate: string[] = ["react"];

export const genarateConfig = ({ answers, root }: { answers: Answers; root: string }) => {
	const templateRoot = path.join(__dirname, "./template", answers.template);
	return {
		platform: resolvePlatForm(), // 平台
		answers: answers, // 选择的模板
		root: root, // 项目根目录
		templateRoot, // 模版根目录
		localTemplate // 本地模板
	} as TConfig;
};
