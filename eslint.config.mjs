import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
// import eslintPluginReactHooks from "eslint-plugin-react-hooks";

/** @type {import('eslint').Linter.Config[]} */
export default [
   { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
   {
      languageOptions: {
         globals: {
            ...globals.browser,
            __IS_DEV__: true, // Добавляем глобальную переменную
         },
      },
   },

   // ...tseslint.configs.recommended, // убираем рекомендованые так как там проверка на неиспользуемые объявленные переменные
   ...tseslint.configs.stylistic,
   // pluginReact.configs.flat.recommended, // убираем рекомендованые так как там проверка на импорт реакта
   pluginReact.configs.flat["jsx-runtime"], // выставляем с приоритетом на конфиг "jsx-runtime"
   // eslintPluginReactHooks.configs.recommended, // для обнаружения ошибок в хуках мемоизации // не работает, орет на него
];
