const urlencode = require("urlencode");
const fs = require("fs-extra");
const path = require("path");

const ignoreBuildFile = require("../../../ignoreBuildFile");

const resolveAssets = paths => {
	const result = [];

	const assets = paths.map(p => {
		const dirs = fs.readdirSync(p);

		for (const dir of dirs) {
			const asset = path.join(p, dir);
			if (fs.statSync(asset).isDirectory()) {
				const kidResult = resolveAssets([asset]);
				result.push(...kidResult);
			} else {
				result.push(asset);
			}
		}
	});
	return result;
};

// 将模版文件打包成字符串数组
module.exports = function rollupBuildString() {
	return {
		name: "rollup-plugin-build-string",
		transform(code, id) {
			// 兼容不同系统
			if (id.includes(path.join("src/template/")) && !ignoreBuildFile.includes(id.split(path.sep).pop())) {
				return {
					code: `export default ${JSON.stringify([urlencode.encode(code)])}`,
					map: null // 如果需要sourcemap的话，需要配置
				};
			}
			return null;
		},
		generateBundle() {
			console.time("转换静态资源");

			// 打包 assets 资源
			const templates = fs.readdirSync(path.join(process.cwd(), "src/template"));
			const paths = templates
				.map(template => {
					return path.join(process.cwd(), "src/template", template, "src/assets");
				})
				.filter(item => fs.existsSync(item));
			const assets = resolveAssets(paths);
			assets.forEach(assetPath => {
				let flag = true;
				const fileName = assetPath
					.split(path.sep)
					.reverse()
					.reduce((prev, cur) => {
						if (cur !== "template" && flag) {
							return path.join(cur, prev);
						}
						flag = false;
						return prev;
					});
				this.emitFile({
					type: "asset",
					fileName: path.join("src", "template", fileName),
					originalFileName: assetPath,
					source: fs.readFileSync(assetPath)
				});
			});
			// 打包husky
			const huskyTarget = path.join(process.cwd(), "src/template/react/.husky");
			const huskyFiles = fs.readdirSync(huskyTarget);
			huskyFiles.forEach(file => {
				this.emitFile({
					type: "asset",
					fileName: path.join("src", "template", "react", ".husky", file),
					originalFileName: path.join(huskyTarget, file),
					source: fs.readFileSync(path.join(huskyTarget, file))
				});
			});
			console.timeEnd("转换静态资源");
		}
	};
};
