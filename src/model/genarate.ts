import fs from "fs-extra";
import { Answers } from "../types/cli";
import { ROOT_DIR } from "../constants";
import {print} from "./print";
import path from "path";

export class Genarate {
	private _answer: Answers;
	private _root: string;
	constructor(answer: Answers, root: string = ROOT_DIR) {
		this._answer = answer as Answers;
		this._root = root;
	}
	public async genaratePkg() {
		const { name, description, author } = this._answer;
		if (fs.existsSync(path.join(this._root, name, "package.json"))) {
			print.green.log(
				`找到package.json ${path.join(this._root, name, "package.json")}`
			);
		}
	}
}
