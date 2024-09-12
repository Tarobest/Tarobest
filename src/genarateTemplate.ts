import ora from "ora";
import { TConfig } from "./config";
import { GenarateReact } from "./model/genarateAPI/genarateReact";
import { Genarate } from "./model/genarate";
import { print } from "./model/print";

export const genarateTemplate = async (config: TConfig) => {
    const spinner = ora();
    spinner.start("正在生成模板");
    const genarate = new GenarateReact(config);
    await genarateFiles(genarate, spinner);
}

async function genarateFiles(genarate: Genarate, spinner: ora.Ora) {
	await genarate.ensureNormalFiles();
	await genarate.genaratePkg();
	await genarate.genarateConfig();
	await genarate.genaratePages();
	spinner.stop();
	print.green.log(`创建完成`);
}
