import { evaluateClone } from "./evaluate-clone";

export default async function (config: { root: string }) {
	return {
		plugins: [
			evaluateClone({
				msg: "搭建耗时"
			})
		]
	};
}
