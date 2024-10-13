import simpleGit, { SimpleGit, TaskOptions } from "simple-git";
import { Answers } from "../types/cli";
import fs from "fs-extra";
import path from "path";

export class Git {
	private _url: string; // 仓库地址
	private _temporarilyDir: string; // 临时目录
	private _git: SimpleGit;
	// private _answer: Answers;
	constructor (url: string, dir: string, answer: Answers) {
		this._url = url;
		this._temporarilyDir = dir;
		this._git = simpleGit({
			baseDir: dir
		});
		// this._answer = answer;
	}
	async clone(path: string, options: TaskOptions = []) {
		await this._git.clone(this._url, path, options);
	}
	async getBranches() {
		const branches = await this._git.branch(["--all"]);

		const branchNames = branches.all
			.filter(branch => branch.startsWith("remotes/origin/"))
			.map(branch => branch.replace(/^remotes\/origin\//, ""));
		return branchNames;
	}
	// 确保分支存在
	async ensureBranch(branch: string) {
		await this._git.checkout(branch);
		await fs.remove(path.join(this._temporarilyDir, ".git"));
	}
	async checkout(branch: string) {
		await this._git.checkout(branch);
	}
	async reset(options: string[] = ["--hard"]) {
		await this._git.reset(options);
	}
	async clean() {
		await this._git.clean("f", { cwd: this._temporarilyDir });
	}
}
