import chalk from "chalk";

class Print {
	private setColor(color: "red" | "green" | "blue") {
		return {
			log(message: string) {
				console.log(chalk[color](message));
			},
			error(message: string) {
				console.log(chalk[color](message));
			}
		};
	}
	green = this.setColor("green");

	red = this.setColor("red");

	blue = this.setColor("blue");
}

export const print =  new Print();
