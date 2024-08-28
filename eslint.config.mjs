import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
	{ files: ["**/*.{js,mjs,cjs,ts}"] },
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	{
		rules: {
			"@typescript-eslint/no-explicit-any": "warn",
			"no-undef": "off",
			"no-tabs": ["error", { allowIndentationTabs: true }],
			indent: ["error", "tab", { ObjectExpression: "off" }],
			"space-before-function-paren": ["error", "always"],
			quotes: ["error", "double"],
			curly: ["error", "multi-or-nest", "consistent"],
			semi: ["error", "always"],
			"no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
			"@typescript-eslint/no-require-imports": "off"
		}
	}
];
