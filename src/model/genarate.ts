import fs from "fs-extra";
import { Answers } from "../types/cli";
import { ROOT_DIR } from "../constants";
import path from "path";

export abstract class Genarate {
	private _answer: Answers;
	private _root: string;
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
	abstract genaratePkg(): Promise<any>;
	abstract genaratePages(): Promise<any>;
}

export class GenarateReact extends Genarate {
	constructor(
		answer: Answers,
		root: string = path.join(ROOT_DIR, answer.name)
	) {
		super(answer, root);
	}
	async genaratePkg() {
		const { name, description, author } = super.getAnswer();
		const PKG = path.join(super.getRoot(), "package.json")
		if (fs.existsSync(PKG)) {
			const pkg = await fs.readJson(PKG);
			pkg.name = name;
			pkg.description = description;
			pkg.author = author;
			await fs.writeJson(PKG, pkg, { spaces: 2 });
		}
	}
	async genaratePages() {}
}
