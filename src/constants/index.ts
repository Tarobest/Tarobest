export const ROOT_DIR = process.cwd();

export const TEMPLATE_SRC = "git@github.com:Tarobest/Tarobest.git";

export enum PROJECT_CONFIG {
    WXCONFIG = "project.config.json"
}

export const IGNORE_FILES = [
	"package.json.js",
	"tsconfig.json.js",
	".husky",
	"node_modules",
	"types",
	"index.html",
	"assets"
]