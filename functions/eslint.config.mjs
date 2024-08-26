import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 2020, // ou a versão que você usa
        sourceType: "module", // se você usa módulos ES
      },
    },
    plugins: {
      "@eslint/js": pluginJs,
    },
    extends: [
      "eslint:recommended", // usa as regras recomendadas do ESLint
    ],
    rules: {
      // adicione suas regras personalizadas aqui
    },
  },
];
