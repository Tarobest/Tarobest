import fs from "fs-extra";
import path from "path";
import { Genarate } from "../genarate";
import { ROOT_DIR, PROJECT_CONFIG } from "../../constants";
import codeSnippets from "../../meta/react/codeSnippets";
import reactPkg from "../../meta/react/pkg.json";
import wxConfig from "../../meta/react/wxConfig.json";
import settings from "../../meta/vscode/settings.json";
import tsConfig from "../../meta/react/tsconfig.json";
import { Answers } from "../../types/cli";
import { Config } from "../../config";

export class GenarateReact extends Genarate {
	constructor(
		config: Config,
		answer: Answers,
		root: string = path.join(ROOT_DIR, answer.name)
	) {
		super(config, answer, root);
	}

	async genaratePkg() {
		const { name, description, author } = super.getAnswer();
		const targetPKG = path.join(super.getRoot(), "package.json");
		const pkg = reactPkg;
		pkg.name = name;
		pkg.description = description;
		pkg.author = author;
		await fs.writeJson(targetPKG, pkg, { spaces: 2 });
	}
	async genaratePages() {}
	async genarateConfig() {
		await this.genarateProjectConfig();
		await this.genarateVscodeConfig();
		await this.genarateTsConfig();
	}
	private async genarateProjectConfig() {
		const { name, description } = super.getAnswer();
		const targetConfig = path.join(
			super.getRoot(),
			PROJECT_CONFIG.WXCONFIG
		);
		const config = wxConfig;
		config.projectname = name;
		config.description = description;
		await fs.writeJson(targetConfig, config, { spaces: 2 });
	}
	private async genarateVscodeConfig() {
		const targetConfig = path.join(
			super.getRoot(),
			".vscode/settings.json"
		);
		await fs.writeJson(targetConfig, settings, { spaces: 2 });
		const targetCodeSnippets = path.join(
			super.getRoot(),
			".vscode/react.code-snippets"
		);
		await fs.writeJson(targetCodeSnippets, codeSnippets, {
			spaces: 2
		});
	}
	private async genarateTsConfig() {
		const targetConfig = path.join(super.getRoot(), "tsconfig.json");
		await fs.writeJson(targetConfig, tsConfig, { spaces: 2 });
	}
}
