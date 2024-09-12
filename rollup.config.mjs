import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import alias from "@rollup/plugin-alias";
import del from "rollup-plugin-delete";
import rollupBuildString from "./src/plugins/rollup/rollupBuildString.js";
import copy from "rollup-plugin-copy";
import { terser } from "rollup-plugin-terser";
import ignoreBuildFile from "./ignoreBuildFile.js"
import fs from "fs-extra";
// import path from "path";
const templates = fs.readdirSync("src/template");

function resolveTemplateEntrys() {
	const result = ["index.ts"]
	const ignoreFile = ignoreBuildFile

	function dfsFile(dirs, path) {
		for(let dir of dirs) {
			// 是不是dir
			if(fs.statSync(`${path}/${dir}`).isDirectory()) {
				const files = fs.readdirSync(`${path}/${dir}`);
				const dirs = files.filter((file => !ignoreFile.includes(file)))
				dfsFile(dirs, `${path}/${dir}`)
			} else {
				result.push(`${path}/${dir}`)
			}
		}
	}

	templates.forEach((template) => {
		const files = fs.readdirSync(`src/template/${template}`);
		const dirs = files.filter((file => !ignoreFile.includes(file)))
		dfsFile(dirs, `src/template/${template}`)
	});
	console.log(result);
	
	return result;
}

function resolveCopyEntrys() {
    const copy = {
		targets: []
	}
	for(let template of templates) {
		copy.targets.push({
			src: `src/template/${template}/assets/**/*`,
			dest: `dist/template/${template}/assets`
		})
	}
	return copy
}


const isProd = process.env.NODE_ENV === "production";

const plugins = [
	json(),
	del({ targets: "dist/*", verbose: true }), // 删除 dist 目录
	alias({ entries: { "@": "src" } }),
	resolve({
		exportConditions: ["node"]
	}),
	copy(resolveCopyEntrys()),
	rollupBuildString(),
	commonjs(), // 转换 CommonJS 模块
	typescript({
		// 用 TypeScript 编译 TypeScript 代码
		tsconfig: "./tsconfig.json", // 指向你的 TypeScript 配置文件
		clean: true // 让插件在每次构建前清理输出目录
	})
];

if (isProd) {
	plugins.push(terser());
}



// ---cut-start---
/** @type {import('rollup').RollupOptions} */
// ---cut-end---
export default {
	input: resolveTemplateEntrys(), // 入口文件，根据你的项目结构调整
	// input: ["index.ts", "src/template/react/src/app.ts"],
	output: {
		format: "cjs", // CommonJS 格式，适用于 Node.js
		dir: "dist", // 输出目录
		preserveModules: true // 保留模块结构
	},
	plugins: plugins,
	external: ["react"]
};
