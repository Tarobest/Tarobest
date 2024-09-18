export const formatFileName = (dirPath: string, fileName: string) => {
	if (dirPath.includes(".husky")) {
		return fileName.replace(/.js/, "");
	} else if (fileName.endsWith("scss.js") || fileName.endsWith("css.js") || fileName.endsWith("less.js")) {
		return fileName.replace(/.js/, "");
	} else if (fileName.endsWith(".config.js")) {
		return fileName.replace(/.js/, ".ts");
	} else if (
		(fileName.endsWith(".js") && dirPath.includes("pages")) ||
		(fileName.endsWith(".js") && dirPath.includes("components"))
	) {
		fileName = fileName.replace(/.js/, ".tsx");
	} else if(dirPath.includes("scripts")) {
        // doing nothing
    } else if (fileName.endsWith(".js")) {
		return fileName.replace(/.js/, ".ts");
	}
	return fileName;
};
