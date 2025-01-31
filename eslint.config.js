/* @ts-check */
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tsESlint from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier";

export default tsESlint.config(
	{ ignores: ["dist", "node_modules", "**/*.config.js", "!**/eslint.config.js"] },
	{
		extends: [js.configs.recommended, ...tsESlint.configs.recommended],
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			ecmaVersion: 2024,
			globals: globals.browser,
		},
		plugins: {
			"react-hooks": reactHooks,
			"react-refresh": reactRefresh,
			"prettier": prettierPlugin,
		},
		rules: {
			"react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
			"@typescript-eslint/no-var-requires": "off",
			"prettier/prettier": ["error", { endOfLine: "lf", singleQuote: false }],
		},
	},
);
