import fs from "fs-extra";
import { Answers } from "../types/cli";
import extensions from "../meta/vscode/extensions.json";
import prettierignore from "../meta/prettierignore";
import gitignore from "../meta/gitignore";
import path from "path";
import { Config } from "../config";
import { resolveLineBreak } from "../utils/resolvePlatForm";
import { HTMLTemplate } from "../meta/html";
import { commitlintConfig } from "../meta/commitlint.config";
import prettierConfig from '../meta/prettier.json'
import eslintConfig from '../meta/eslint.json'
import { format } from "prettier";

export abstract class Genarate {
	private _config: Config;
	constructor(
		config: Config,
	) {
		this._config = config;
	}


	getConfig() {
		return this._config;
	}
	async ensureNormalFiles() {
		await genarateExtensions(this._config.root);
		await genarateIgnore(this._config.root, this._config);
		await genarateEnv(this._config.root, this._config);
		await genarateHTML(this._config.root, this._config, this._config.answers);
		await genarateCommitlint(this._config.root, this._config);
		await genaratePrettier(this._config.root, this._config);
	}
	abstract genaratePkg(): any;
	abstract genaratePages(): any;
	abstract genarateConfig(): any;
}

async function genarateExtensions(root: string) {
	await fs.ensureDir(path.join(root, ".vscode"));
	await fs.writeJSON(
		path.join(root, ".vscode/extensions.json"),
		extensions,
		{ spaces: 2 }
	);
}

// 生成 .prettierignore 和 .gitignore
async function genarateIgnore(root: string, config: Config) {
	const linebreak = resolveLineBreak(config.platform);
	const prtignore = prettierignore.reduce((pre, cur) => {
		return pre + linebreak + cur;
	});
	await fs.writeFile(path.join(root, ".prettierignore"), prtignore);
	const gignore = gitignore.reduce((pre, cur) => {
		return pre + linebreak + cur;
	});
	await fs.writeFile(path.join(root, ".gitignore"), gignore);
}

// 生成环境变量文件
async function genarateEnv(root: string, config: Config) {
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
	await fs.writeFile(path.join(root, ".env.development"), devEnv);
}

async function genarateHTML(
	root: string,
	config: Config,
	answer: Answers
) {
	const html = HTMLTemplate({
		title: answer.name
	});
	await fs.writeFile(path.join(root, "index.html"), html, "utf-8");
}

async function genarateCommitlint(root: string, config: Config) {
	const targetConfig = path.join(root, "commitlint.config.cjs");
    const commitlint = commitlintConfig
	const commitlintText = await format(
		`module.exports = ${JSON.stringify(commitlint, null, 2)}`,
		{
			semi: false,
			parser: "babel",
		}
	);
	await fs.writeFile(targetConfig, commitlintText);
}

async function genaratePrettier(root: string, config: Config) {
	const targetConfig = path.join(root, ".prettierrc");
	const prettier = prettierConfig;
	await fs.writeJSON(targetConfig, prettier, { spaces: 2 });
}

async function genarateESLint(root: string, config: Config) {
	const targetConfig = path.join(root, ".eslintrc");
	const eslint = eslintConfig;
	await fs.writeJSON(targetConfig, eslint, { spaces: 2 });
}