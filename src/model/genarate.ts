import fs from "fs-extra";
import { Answers } from "../types/cli";
import { ROOT_DIR } from "../constants";
import path from "path";

export abstract class Genarate {
	private _answer: Answers;
	private _root: string; // 项目根目录
	constructor(
		answer: Answers,
		root: string = path.join(ROOT_DIR, answer.name)
	) {
		this._answer = answer as Answers;
		this._root = root;
	}
	getAnswer() {
		return this._answer;
	}
	getRoot() {
		return this._root;
	}
	async ensureNormalFiles() {
		await genarateExtensions(this._root);
	}
	abstract genaratePkg(): any;
	abstract genaratePages(): any;
	abstract genarateProjectConfig(): any;
	abstract genarateVscodeConfig(): any;
}


async function genarateExtensions(root: string) {
	const extensions = await import("../meta/vscode/extensions.json");
	await fs.ensureDir(path.join(root, ".vscode"));
	await fs.writeJSON(
		path.join(root, ".vscode/extensions.json"),
		extensions,
		{ spaces: 2 }
	);
}
