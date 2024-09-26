import fs from "fs-extra";
import { Answers } from "../types/cli";
import extensions from "../meta/vscode/extensions.json";
import prettierignore from "../meta/prettierignore";
import gitignore from "../meta/gitignore";
import eslintignore from "../meta/eslintignore";
import path from "path";
import { TConfig } from "../config";
import { resolveLineBreak } from "../utils/resolvePlatForm";
import { HTMLTemplate } from "../meta/html";
import { commitlintConfig } from "../meta/commitlint.config";
import { stylelintConfig } from "../meta/.stylelintrc";
import prettierConfig from "../meta/prettier.json";
import eslintConfig from "../meta/eslint.json";
import { format } from "prettier";
import { print } from "./print";

export abstract class Genarate {
	private _config: TConfig;
	constructor(config: TConfig) {
		this._config = config;
	}

	getConfig() {
		return this._config;
	}
	async ensureNormalFiles() {
		try {
			await genarateExtensions(this._config.root);
			await genarateIgnore(this._config.root, this._config);
			await genarateEnv(this._config.root, this._config);
			await genarateHTML(this._config.root, this._config, this._config.answers);
			await genarateCommitlint(this._config.root, this._config);
			await genaratePrettier(this._config.root, this._config);
			await genarateEsLint(this._config.root, this._config);
			await genarateStylelint(this._config.root, this._config);
			await genarateAssets(this._config.root, this._config);
			await genarateHusky(this._config.root, this._config);
		} catch (e) {
			print.red.error(`通用文件打包报错: ${e}`);
		}
	}
	abstract genaratePkg(): any;
	abstract genaratePages(): any;
	abstract genarateConfig(): any;
}

async function genarateExtensions(root: string) {
	await fs.ensureDir(path.join(root, ".vscode"));
	await fs.writeJSON(path.join(root, ".vscode/extensions.json"), extensions, { spaces: 2 });
}

// 生成 .prettierignore 和 .gitignore , eslintignore
async function genarateIgnore(root: string, config: TConfig) {
	const linebreak = resolveLineBreak(config.platform);

	const prtignore = prettierignore.reduce((pre, cur) => {
		return pre + linebreak + cur;
	});
	await fs.writeFile(path.join(root, ".prettierignore"), prtignore);

	const gignore = gitignore.reduce((pre, cur) => {
		return pre + linebreak + cur;
	});
	await fs.writeFile(path.join(root, ".gitignore"), gignore);

	const esignore = eslintignore.reduce((pre, cur) => {
		return pre + linebreak + cur;
	});
	await fs.writeFile(path.join(root, ".eslintignore"), esignore);
}

// 生成环境变量文件
async function genarateEnv(root: string, config: TConfig) {
	const linebreak = resolveLineBreak(config.platform);
	const env = {
		dev: {
			TARO_APP_SERVER: true
		},
		prod: {
			TARO_APP_SERVER: true
		}
	};
	const devEnv = Object.entries(env.dev).reduce((pre, cur) => {
		return pre + linebreak + `${cur[0]}=${cur[1]}`;
	}, '# TARO_APP_ID="开发环境下的小程序appid"');
	const prodEnv = Object.entries(env.prod).reduce((pre, cur) => {
		return pre + linebreak + `${cur[0]}=${cur[1]}`;
	}, '# TARO_APP_ID="生产环境下的小程序appid"');
	await fs.writeFile(path.join(root, ".env.development"), devEnv);
	await fs.writeFile(path.join(root, ".env.production"), prodEnv);
}

async function genarateHTML(root: string, config: TConfig, answer: Answers) {
	await fs.ensureDir(path.join(root, "src"));
	const html = HTMLTemplate({
		title: answer.name
	});
	await fs.writeFile(path.join(root, "src", "index.html"), html, "utf-8");
}

async function genarateCommitlint(root: string, config: TConfig) {
	const targetConfig = path.join(root, "commitlint.config.cjs");
	const commitlint = commitlintConfig;
	const commitlintText = await format(`module.exports = ${JSON.stringify(commitlint, null, 2)}`, {
		semi: false,
		parser: "babel"
	});
	await fs.writeFile(targetConfig, commitlintText);
}

async function genaratePrettier(root: string, config: TConfig) {
	const targetConfig = path.join(root, ".prettierrc");
	const prettier = prettierConfig;
	await fs.writeJSON(targetConfig, prettier, { spaces: 2 });
}

async function genarateEsLint(root: string, config: TConfig) {
	const targetConfig = path.join(root, ".eslintrc");
	const eslint = eslintConfig;
	await fs.writeJSON(targetConfig, eslint, { spaces: 2 });
}

async function genarateStylelint(root: string, config: TConfig) {
	const targetConfig = path.join(root, ".stylelintrc.js");
	const stylelint = stylelintConfig;
	const stylelintText = await format(`module.exports = ${JSON.stringify(stylelint, null, 2)}`, {
		semi: false,
		parser: "babel"
	});
	await fs.writeFile(targetConfig, stylelintText);
}
// 生成assets
async function genarateAssets(root: string, config: TConfig) {
	const { templateRoot } = config;
	const assetsRoot = path.join(templateRoot, "src/assets");
	const targetAssetsRoot = path.join(root, "src/assets");
	await fs.copy(assetsRoot, targetAssetsRoot);
}

async function genarateHusky(root: string, config: TConfig) {
	const { templateRoot } = config;
	const huskyRoot = path.join(templateRoot, ".husky");
	const targetHuskyRoot = path.join(root, ".husky");
	await fs.copy(huskyRoot, targetHuskyRoot);
}
