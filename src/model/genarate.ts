import fs from "fs-extra";
import { Answers } from "../types/cli";
import { ROOT_DIR } from "../constants";
import extensions from '../meta/vscode/extensions.json'
import prettierignore from "../meta/prettierignore";
import path from "path";
import { Config } from "../config";
import { resolveLineBreak } from "../utils/resolvePlatForm";

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

async function genarateIgnore(root: string, config: Config) {
	const linebreak = resolveLineBreak(config.platform);
	const prtignore = prettierignore.reduce((pre, cur) => {
		return pre  + linebreak + cur;
	})
	await fs.writeFile(path.join(root,'.prettierignore'), prtignore);
}