// 将js 文件还原成原本的后缀名
export const formatFileName = (dirPath: string, fileName: string) => {
	// 匹配 css 文件
	if (fileName.endsWith("scss.js") || fileName.endsWith("css.js") || fileName.endsWith("less.js")) {
		return fileName.replace(/.js/, "");
		// 匹配 config 文件
	} else if (fileName.endsWith(".config.js")) {
		return fileName.replace(/.js/, ".ts");
		// 匹配页面文件
	} else if (
		(fileName.endsWith(".js") && dirPath.includes("pages")) ||
		(fileName.endsWith(".js") && dirPath.includes("components"))
	) {
		fileName = fileName.replace(/.js/, ".tsx");
		// 匹配 scripts 下文件
	} else if (dirPath.includes("scripts")) {
		// doing nothing
		// 匹配剩余 js 文件
	} else if (fileName.endsWith(".js")) {
		return fileName.replace(/.js/, ".ts");
	}
	return fileName;
};
