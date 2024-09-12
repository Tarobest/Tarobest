import fs from "fs-extra";
import path from "path";
import { Genarate } from "../genarate";
import { ROOT_DIR, PROJECT_CONFIG } from "../../constants";
import codeSnippets from "../../meta/react/codeSnippets";
import reactPkg from "../../template/react/package.json";
import wxConfig from "../../meta/react/wxConfig.json";
import settings from "../../meta/vscode/settings.json";
import tsConfig from "../../template/react/tsconfig.json";
import { format } from "prettier";
import { TConfig } from "../../config";
import { reactBabelConfig } from "../../meta/react/babel.config";

export class GenarateReact extends Genarate {
	constructor(
		config: TConfig,
	) {
		super(config);
	}

	async genaratePkg() {
		
		const { name, description, author } = super.getConfig().answers;
		const targetPKG = path.join(super.getConfig().root, "package.json");
		const pkg = reactPkg;
		pkg.name = name;
		pkg.description = description;
		pkg.author = author;
		await fs.writeJson(targetPKG, pkg, { spaces: 2 });
	}
	async genaratePages() {
		const files = await fs.readdir(path.join(__dirname, "../../template/react/src"));
		console.log(files);
		
	}
	async genarateConfig() {
		await this.genarateProjectConfig();
		await this.genarateVscodeConfig();
		await this.genarateTsConfig();
		await this.genarateBabelConfig();
	}
	private async genarateProjectConfig() {
		const { name, description } = super.getConfig().answers;
		const targetConfig = path.join(
			super.getConfig().root,
			PROJECT_CONFIG.WXCONFIG
		);
		const config = wxConfig;
		config.projectname = name;
		config.description = description;
		await fs.writeJson(targetConfig, config, { spaces: 2 });
	}
	private async genarateVscodeConfig() {
		const targetConfig = path.join(
			super.getConfig().root,
			".vscode/settings.json"
		);
		await fs.writeJson(targetConfig, settings, { spaces: 2 });
		const targetCodeSnippets = path.join(
			super.getConfig().root,
			".vscode/react.code-snippets"
		);
		await fs.writeJson(targetCodeSnippets, codeSnippets, {
			spaces: 2
		});
	}
	private async genarateTsConfig() {
		const targetConfig = path.join(super.getConfig().root, "tsconfig.json");
		await fs.writeJson(targetConfig, tsConfig, { spaces: 2 });
	}
	private async genarateBabelConfig() {
		const targetConfig = path.join(
			super.getConfig().root,
			"babel.config.js"
		);
		const babelConfig = reactBabelConfig;
		const babelText = await format(
			`module.exports = ${JSON.stringify(babelConfig, null, 2)}`,
			{
				semi: false,
				parser: "babel",
			}
		);
		await fs.writeFile(targetConfig, babelText);
	}
}
