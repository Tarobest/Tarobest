export const ROOT_DIR = process.cwd();

// git 地址模板
export const TEMPLATE_SRC = "git@github.com:Tarobest/Tarobest.git";

export enum PROJECT_CONFIG {
	WXCONFIG = "project.config.json"
}
// 打包忽略文件
export const IGNORE_FILES = ["package.json.js", "tsconfig.json.js", "node_modules", "types", "index.html", "assets"];
