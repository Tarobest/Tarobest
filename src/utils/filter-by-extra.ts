import { Extra } from "../config";
const regex = /<%([^%]*)%>/;
const ifRegex = /if\s*\(\s*([^)]*)\s*\)\s*([^;]*)/;
export const filterByExtra = (content: string, extra: Extra) => {
	const rowContent = content.split("\n");
	const newContent = rowContent.map(row => {
		const matches = row.match(regex);
		if (matches) {
			// 匹配到<%if (extra.xxx) {...}%>
			const nextContent = matches[1];
			// 匹配到if条件字段
			const ifMatches = nextContent.match(ifRegex);
			if (ifMatches) {
				const condition = ifMatches[1];
				const code = ifMatches[2];
				// 是否启用if条件字段， 匹配上返回匹配内容
				if (extra[condition]) {
					return code;
					// 匹配不上返回空字符串
				} else {
					return "";
				}
			}
		}
		return row;
	});
	return newContent.join("\n");
};
