import { execSync } from "child_process";
import chokidar from "chokidar";
import ora from "ora";
import path from "path";
import fs from "fs";
import chalk from "chalk";

const root = process.cwd();
const { green, yellow } = chalk;

const buildCommand = `${JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8")).scripts.build}`;

const watcher = chokidar.watch(path.join(root, "package.json"), {
	ignored: ["**/node_modules/**", "**/dist/**"]
});

const spinner = ora(yellow("开始构建...\n")).start();

// 当 package.json 发生变化时执行构建命令
watcher.on("change", () => {
	console.log("Detected changes in package.json, starting build...");
	try {
		// 执行根目录的构建命令
		const output = execSync(buildCommand, { cwd: root });
		console.log(green("构建成功:"), output.toString());
	} catch (err) {
		console.error("构建失败:", err);
	}
});

// 初始构建
try {
	const initialOutput = execSync(buildCommand, { cwd: root });
	console.log(green("初始构建成功:"), initialOutput.toString());
} catch (err) {
	console.error("初始构建失败:", err);
}

spinner.succeed(green("构建成功，监听中..."));
