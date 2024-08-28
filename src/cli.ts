import { program } from "commander";
import inquirer from "inquirer";
import { SOURCE } from "./source";
import { Answers } from "./types/cli";
import { cloneTemplate } from "./cloneTemplate";

export function createCli() {
	program.executableDir("../src/commands");

	program.command("init").action(async () => {
		const prompts = SOURCE;
		inquirer.prompt(prompts as any).then(async answers => {
			cloneTemplate(answers as Answers);
		});
	});

	program.parse(process.argv);
	return program;
}
