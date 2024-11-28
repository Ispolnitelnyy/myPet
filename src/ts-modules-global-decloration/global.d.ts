// Создаем файл global.d.ts,  нужно указать TypeScript, что SCSS-файлы
// могут быть импортированы. Добавляем декларацию модуля:

// declare module "*.module.scss" {
//   const classNames: { [key: string]: string };
//   export default classNames;
// }

//global.d.ts не определяет типы модуля css
// для решения этой проблемы я установил пакет "typed-scss-modules"
// npm install typed-scss-modules --save-dev
// запуска генерации .d.ts файлов для всех SCSS модулей: npx typed-scss-modules src
// Чтобы автоматически генерировать .d.ts файлы при изменении SCSS: npx typed-scss-modules src --watch
// при таком подходе через TS IDE подсказывает доступные варианты
