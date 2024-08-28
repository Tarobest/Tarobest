import { evaluateClone } from "./evaluateClone";

export default async function () {
	return {
		plugins: [evaluateClone({
            msg: '搭建耗时'
        })]
	};
}
