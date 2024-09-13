import fs from "fs-extra";
import path from "path";
import { Genarate } from "../genarate";
import { PROJECT_CONFIG } from "../../constants";
import codeSnippets from "../../meta/react/codeSnippets";
import reactPkg from "../../template/react/package.json";
import wxConfig from "../../meta/react/wxConfig.json";
import settings from "../../meta/vscode/settings.json";
import tsConfig from "../../template/react/tsconfig.json";
import { format } from "prettier";
import { TConfig } from "../../config";
import { IGNORE_FILES } from "../../constants";
import { reactBabelConfig } from "../../meta/react/babel.config";
import { matchOuterBrackets } from "../../utils/matchOuterBrackets";

export class GenarateReact extends Genarate {
	constructor(config: TConfig) {
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
		const { templateRoot, root } = super.getConfig();
		await this.genaratePagesByDfs(".", root, templateRoot);
	}

	async genarateConfig() {
		await this.genarateProjectConfig();
		await this.genarateVscodeConfig();
		await this.genarateTsConfig();
		await this.genarateBabelConfig();
	}
	private async genaratePagesByDfs(dirPath: string, root: string, templateRoot: string) {
		const files = await fs.readdir(path.join(templateRoot, dirPath));
		const dirs = files.filter(file => !IGNORE_FILES.includes(file));

		for (const dir of dirs) {
			if (fs.statSync(path.join(templateRoot, dirPath, dir)).isDirectory()) {
				await fs.ensureDir(path.join(root, dirPath, dir));
				await this.genaratePagesByDfs(path.join(dirPath, dir), root, templateRoot);
			} else {
				const content = await fs.readFile(path.join(templateRoot, dirPath, dir));
				const result = matchOuterBrackets(content.toString());

				if (result) {
					const fileContent = (JSON.parse(result) as string[]).join("\n");
					let fileName = dir;
					if (dirPath.includes(".husky")) {
						fileName = dir.replace(/.js/, "");
					} else if (dir.endsWith("scss.js") || dir.endsWith("css.js") || dir.endsWith("less.js")) {
						fileName = dir.replace(/.js/, "");
					} else if (dir.endsWith(".config.js")) {
						fileName = dir.replace(/.js/, ".ts");
					} else if (
						(dir.endsWith(".js") && dirPath.includes("pages")) ||
						(dir.endsWith(".js") && dirPath.includes("components"))
					) {
						fileName = dir.replace(/.js/, ".tsx");
					} else if (dir.endsWith(".js")) {
						fileName = dir.replace(/.js/, ".ts");
					}
					await fs.writeFile(path.join(root, dirPath, fileName), fileContent);
				}
			}
		}
	}
	private async genarateProjectConfig() {
		const { name, description } = super.getConfig().answers;
		const targetConfig = path.join(super.getConfig().root, PROJECT_CONFIG.WXCONFIG);
		const config = wxConfig;
		config.projectname = name;
		config.description = description;
		await fs.writeJson(targetConfig, config, { spaces: 2 });
	}
	private async genarateVscodeConfig() {
		const targetConfig = path.join(super.getConfig().root, ".vscode/settings.json");
		await fs.writeJson(targetConfig, settings, { spaces: 2 });
		const targetCodeSnippets = path.join(super.getConfig().root, ".vscode/react.code-snippets");
		await fs.writeJson(targetCodeSnippets, codeSnippets, {
			spaces: 2
		});
	}
	private async genarateTsConfig() {
		const targetConfig = path.join(super.getConfig().root, "tsconfig.json");
		await fs.writeJson(targetConfig, tsConfig, { spaces: 2 });
	}
	private async genarateBabelConfig() {
		const targetConfig = path.join(super.getConfig().root, "babel.config.js");
		const babelConfig = reactBabelConfig;
		const babelText = await format(`module.exports = ${JSON.stringify(babelConfig, null, 2)}`, {
			semi: false,
			parser: "babel"
		});
		await fs.writeFile(targetConfig, babelText);
	}
}
