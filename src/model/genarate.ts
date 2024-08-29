import fs from "fs-extra";
import { Answers } from "../types/cli";
import { PROJECT_CONFIG, ROOT_DIR } from "../constants";
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
	abstract genarateWxConfig(): Promise<any>;
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
		const targetPKG = path.join(super.getRoot(), "package.json");
		const reactPkg = await import("../meta/react/reactPkg.json")
		const pkg = reactPkg;
		pkg.name = name;
		pkg.description = description;
		pkg.author = author;
		await fs.writeJson(targetPKG, pkg, { spaces: 2 });
	}
	async genaratePages() {}
	async genarateWxConfig() {
		const { name, description } = super.getAnswer();
		const wxConfig = await import("../meta/react/wxConfig.json");
		const targetConfig = path.join(super.getRoot(),  PROJECT_CONFIG.WXCONFIG);
		const config = wxConfig;
		config.projectname = name;
		config.description = description;
		await fs.writeJson(targetConfig, config, { spaces: 2 });
	}
}
