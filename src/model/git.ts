import simpleGit, { SimpleGit } from "simple-git";
import { Answers } from "../types/cli";

export class Git {
	private _url: string; // 仓库地址
	private _temporarilyDir: string; // 临时目录
	private _git: SimpleGit;
	private _answer: Answers;
	constructor(url: string, dir: string, answer: Answers) {
		this._url = url;
		this._temporarilyDir = dir;
		this._git = simpleGit({
			baseDir: dir
		});
		this._answer = answer;
	}
	async clone(path: string, options: string[] = []) {
		await this._git.clone(this._url, path, options);
	}
	async getBranches() {
		const branches = await this._git.branch(["--all"]);
		const branchNames = branches.all.map(branch =>
			branch.replace(/^remotes\/origin\//, "")
		);
		return branchNames;
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
