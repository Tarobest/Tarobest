const urlencode = require("urlencode");

const ignoreBuildFile = require("../../../ignoreBuildFile");

// 将模版文件打包成字符串数组
module.exports = function rollupBuildString() {
	return {
		name: "rollup-plugin-build-string",
		transform(code, id) {
			if (
				id.includes("src/template/") &&
				!id.includes("assets") &&
				!ignoreBuildFile.includes(id.split("/").pop())
			) {
				return {
					code: `export default ${JSON.stringify([urlencode.encode(code)])}`,
					map: null // 如果需要sourcemap的话，需要配置
				};
			} else if (id.includes("src/template/") && id.includes("assets")) {
				return {
					code: `export default ${JSON.stringify([id])}`,
					map: null // 如果需要sourcemap的话，需要配置
				};
			}
			return null;
		}
	};
};
