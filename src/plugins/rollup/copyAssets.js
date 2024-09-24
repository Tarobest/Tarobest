const fs = require("fs-extra");
const path = require("path");
module.exports = function copyAssets() {
	const assetPaths = [];
	return {
		name: "rollup-plugin-copy-assets",
		load(id) {
			if (id.includes("assets")) {
				assetPaths.push(id);
			}
		},
		generateBundle(options, bundle) {
			assetPaths.forEach(assetPath => {
				let flag = true;
				const fileName = assetPath
					.split("/")
					.reverse()
					.reduce((prev, cur) => {
						if (cur !== "template" && flag) {
							return path.join(cur, prev);
						}
						flag = false;
						return prev;
					});

				// 产出一个包含在生成产物中的新文件，并返回一个 referenceId，可以在各种地方使用它来引用生成的文件。你可能会产出代码块、预构建的代码块或者资源文件。
				this.emitFile({
					type: "asset",
					fileName: path.join("src", "template", fileName),
					originalFileName: assetPath,
					source: fs.readFileSync(assetPath)
				});
			});
		},
		closeBundle() {
			assetPaths.forEach(assetPath => {
				let flag = true;
				const fileName = assetPath
					.split("/")
					.reverse()
					.reduce((prev, cur) => {
						if (cur !== "template" && flag) {
							return path.join(cur, prev);
						}
						flag = false;
						return prev;
					});
				// 删除多余js文件
				if (fs.existsSync(path.join(process.cwd(), "dist/src/template", fileName + ".js")))
					fs.unlinkSync(path.join(process.cwd(), "dist/src/template", fileName + ".js"));
			});
		}
	};
};
