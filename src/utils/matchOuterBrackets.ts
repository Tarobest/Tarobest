export function matchOuterBrackets(input: string) {
	let stack = [];
	let result = "";

	for (let i = 0; i < input.length; i++) {
		if (input[i] === "[") {
			if (stack.length === 0) {
				result = "[";
			} else {
				result += "[";
			}
			stack.push("[");
		} else if (input[i] === "]") {
			stack.pop();
			result += "]";
			if (stack.length === 0) {
				break;
			}
		} else if (stack.length > 0) {
			result += input[i];
		}
	}
    return result;
}
