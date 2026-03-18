import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended, // Підключаємо рекомендовані правила
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node, // Дозволяємо Node.js глобальні змінні
      },
    },
    rules: {
      semi: ["error", "always"], // Обов'язкова крапка з комою
      "no-unused-vars": ["error", { args: "none" }], // Помилка, якщо є зайві змінні
      "no-undef": "error", // Помилка, якщо змінна не оголошена
    },
  },
];
