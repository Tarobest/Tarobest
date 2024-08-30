import { ROOT_DIR, PROJECT_CONFIG } from "@/constants";
import { Answers } from "@/types/cli";
import fs from "fs-extra";
import path from "path";
import { Genarate } from "../genarate";
import reactPkg from "@/meta/react/pkg.json"
import wxConfig from "@/meta/react/wxConfig.json"
import settings from "@/meta/vscode/settings.json"
import codeSnippets from "@/meta/react/codeSnippets";

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
		const pkg = reactPkg;
		pkg.name = name;
		pkg.description = description;
		pkg.author = author;
		await fs.writeJson(targetPKG, pkg, { spaces: 2 });
	}
	async genaratePages() {}
	async genarateProjectConfig() {
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
	async genarateVscodeConfig() {
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
}
