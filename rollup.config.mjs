import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import alias from "@rollup/plugin-alias";
import rollupBuildString from './src/plugins/rollup/rollupBuildString.js'
// import fs from "fs-extra";
// import path from "path";

// function resolveMetaPaths() {
// 	const baseDir = path.resolve(process.cwd(), "src/meta");
// 	const entries = {};
// 	const files = fs.readdirSync(baseDir);
// 	files.forEach(file => {
// 		if (file.endsWith(".json")) {
// 			entries["meta/" + file.replace(".json", "")] =
// 				"./src/meta/" + file;
// 		}
// 	});
// 	return entries;
// }

// ---cut-start---
/** @type {import('rollup').RollupOptions} */
// ---cut-end---
export default {
	input: {
		index: "index.ts",
		// ...resolveMetaPaths()
	}, // 入口文件，根据你的项目结构调整
	output: {
		format: "cjs", // CommonJS 格式，适用于 Node.js
		dir: "dist", // 输出目录
		preserveModules: true, // 保留模块结构
	},
	plugins: [
		json(),
		alias({ entries: { '@/*': "./src/*" } }),
		resolve({
			exportConditions: ["node"]
		}),
		rollupBuildString(),
		commonjs(), // 转换 CommonJS 模块
		typescript({
			// 用 TypeScript 编译 TypeScript 代码
			tsconfig: "./tsconfig.json", // 指向你的 TypeScript 配置文件
			clean: true, // 让插件在每次构建前清理输出目录
		})
	]
};
