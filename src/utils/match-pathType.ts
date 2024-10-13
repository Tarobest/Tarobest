import fs from "fs-extra";

export function isLocalPath (inputPath: string) {
	// 正则表达式来检查路径是否以盘符或斜杠开头
	const localPathRegex = /^([a-zA-Z]:\\)|(^\/)/;

	if (localPathRegex.test(inputPath)) {
		// 尝试使用文件系统模块检查路径是否存在
		try {
			const stats = fs.statSync(inputPath);
			if (stats) return true; 
		} catch (error) {
			console.log(error);
			return false;
		}
	}

	// 如果路径不以盘符或斜杠开头，检查是否包含类似 IP 地址的模式
	const ipRegex = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
	return !ipRegex.test(inputPath);
}
