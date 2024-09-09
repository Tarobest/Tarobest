import fs from "fs-extra";
import { Answers } from "../types/cli";
import { ROOT_DIR } from "../constants";
import extensions from "../meta/vscode/extensions.json";
import prettierignore from "../meta/prettierignore";
import gitignore from "../meta/gitignore";
import path from "path";
import { Config } from "../config";
import { resolveLineBreak } from "../utils/resolvePlatForm";
import { HTMLTemplate } from "../meta/html";

export abstract class Genarate {
	private _answer: Answers;
	private _root: string; // 项目根目录
	private _config: Config;
	constructor(
		config: Config,
		answer: Answers,
		root: string = path.join(ROOT_DIR, answer.name)
	) {
		this._answer = answer as Answers;
		this._root = root;
		this._config = config;
	}
	getAnswer() {
		return this._answer;
	}
	getRoot() {
		return this._root;
	}
	async ensureNormalFiles() {
		await genarateExtensions(this._root);
		await genarateIgnore(this._root, this._config);
		await genarateEnv(this._root, this._config);
		await genarateHTML(this._root, this._config, this._answer);
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
