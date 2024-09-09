export const commitlintConfig = {
	extends: ["@commitlint/config-conventional"],
	rules: {
		"subject-case": [0],
		"type-enum": [
			2,
			"always",
			[
				"feat",
				"fix",
				"docs",
				"style",
				"refactor",
				"perf",
				"test",
				"build",
				"cli",
				"revert",
				"chore"
			]
		]
	}
};
