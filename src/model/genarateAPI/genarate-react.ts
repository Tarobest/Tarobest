import fs from "fs-extra";
import path from "path";
import { decode } from "urlencode";
import { Genarate } from "../genarate";
import { PROJECT_CONFIG } from "../../constants";
import codeSnippets from "../../meta/react/code-snippets";
import reactPkg from "../../template/react/package.json";
import wxConfig from "../../meta/react/wx-config.json";
import settings from "../../meta/vscode/settings.json";
import tsConfig from "../../template/react/tsconfig.json";
import { format } from "prettier";
import { TConfig } from "../../config";
import { IGNORE_FILES } from "../../constants";
import { reactBabelConfig } from "../../meta/react/babel.config";
import { matchOuterBrackets } from "../../utils/match-outer-brackets";
import { formatFileName } from "../../utils/format-filename";
import { filterByExtra } from "../../utils/filter-by-extra";

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
		const { templateRoot, root, baseRoot } = super.getConfig();
		await this.genaratePagesByDfs(".", root, templateRoot);
		await this.genaratePagesByDfs(".", root, baseRoot);
	}

	async genarateConfig() {
		await this.genarateProjectConfig();
		await this.genarateVscodeConfig();
		await this.genarateTsConfig();
		await this.genarateBabelConfig();
	}
	/**
	 *
	 * @param dirPath 当前目录路径
	 * @param root 目标根目录
	 * @param templateRoot 模版目录
	 */
	private async genaratePagesByDfs(dirPath: string, root: string, templateRoot: string) {
		const files = await fs.readdir(path.join(templateRoot, dirPath));

		const dirs = files.filter(file => !IGNORE_FILES.includes(file));

		for (const dir of dirs) {
			// 是目录继续递归
			if (fs.statSync(path.join(templateRoot, dirPath, dir)).isDirectory()) {
				await fs.ensureDir(path.join(root, dirPath, dir));
				await this.genaratePagesByDfs(path.join(dirPath, dir), root, templateRoot);
				// 不是生成
			} else {
				const content = await fs.readFile(path.join(templateRoot, dirPath, dir));
				// 匹配外层中括号获取文件内容
				const result = matchOuterBrackets(content.toString());

				if (result) {
					// 进行解码
					let fileContent = decode(JSON.parse(result)[0] as string);
					fileContent = filterByExtra(fileContent, this.getConfig().extra);
					// 更改文件后缀名
					let fileName = formatFileName(dirPath, dir);

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
