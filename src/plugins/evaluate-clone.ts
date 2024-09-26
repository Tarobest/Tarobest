import { Plugin } from "../types/plugin";

export function evaluateClone(config?: { msg: string }): Plugin {
	let log = config?.msg || "evaluateClone";
	return {
		name: "evaluateClone",
		beforeBuild() {
			console.time(log);
		},
		afterBuild() {
			console.timeEnd(log);
		}
	};
}
