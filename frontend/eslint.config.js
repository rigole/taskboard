import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import tselint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import globals from "globals";
import * as tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores(["dist"]),

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      prettier: prettierPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      "prettier/prettier": "error",
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  prettierConfig,
]);