export default function get(value: any = {}): any {
	return {
		//en 和 zh是语言类型,可以新增语言或重命名
		en: {
			test: "this is test text",
			testParam: `Resend in ${value.time} s`,
			testMultiParam: value.name + "go to" + value.school
		},
		zh: {
			test: "这是测试文本",
			testParam: `${value.time}秒后重发`,
			testMultiParam: value.name + "去上" + value.school
		}
	};
}
