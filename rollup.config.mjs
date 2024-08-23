import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";

export default {
	input: "src/cli.ts", // 入口文件，根据你的项目结构调整
	output: {
		file: "dist/cli.cjs", // 输出文件路径
		format: "cjs" // CommonJS 格式，适用于 Node.js
	},
	plugins: [
		json(),
		resolve(),
		commonjs(), // 转换 CommonJS 模块
		typescript({
			// 用 TypeScript 编译 TypeScript 代码
			tsconfig: "./tsconfig.json", // 指向你的 TypeScript 配置文件
			clean: true // 让插件在每次构建前清理输出目录
		})
	]
};
