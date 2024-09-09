export const stylelintConfig = {
	extends: [
		"stylelint-config-standard-scss",
		"stylelint-config-recommended-scss",
		"stylelint-config-idiomatic-order"
	],
	plugins: ["stylelint-order"],
	overrides: [
		{
			files: ["**/*.scss"],
			customSyntax: "postcss-scss"
		}
	],
	ignoreFiles: [
		"**/*.js",
		"**/*.ts",
		"**/*.jsx",
		"**/*.tsx",
		"**/*.json",
		"**/*.md",
		"**/*.yaml"
	],
	rules: {
		"no-descending-specificity": null,
		"selector-class-pattern": null,
		"selector-id-pattern": null,
		"selector-type-no-unknown": null,
		"at-rule-no-unknown": null,
		"unit-no-unknown": null
	}
};
