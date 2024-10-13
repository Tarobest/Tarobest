import ora from "ora";
import { TConfig } from "./config";
import { GenarateReact } from "./model/genarateAPI/genarate-react";
import { Genarate } from "./model/genarate";
import { print } from "./model/print";

export const genarateTemplate = async (config: TConfig) => {
	const spinner = ora();
	spinner.start("正在生成模板");
	// 创建生成器对象
	const genarate = new GenarateReact(config);
	await genarateFiles(genarate, spinner);
};

async function genarateFiles (genarate: Genarate, spinner: ora.Ora) {
	// 生成通用文件
	await genarate.ensureNormalFiles();
	// 生成pkg文件
	await genarate.genaratePkg();
	// 生成配置文件
	await genarate.genarateConfig();
	// 生成页面文件
	await genarate.genaratePages();
	spinner.stop();
	print.green.log("创建完成");
}
