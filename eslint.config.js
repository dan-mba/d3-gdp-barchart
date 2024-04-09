import globals from "globals";
import js from "@eslint/js";

export default [
  {
    ignores: ["dist/**/*"],
  },
  {
    files: ["**/*.{js,jsx}"],
    ...js.configs.recommended,
    languageOptions: {
      globals: {
        ...globals.browser,
      }
    },
    rules: {
    }
  }
];