# myPet

---

1 Основы webpack, Добавление TS branch: startDev/webpack/typescript/1

1. npm init -y
2. создаем src, index.js
3. [webpack.js.org]
   3.1. npm install webpack webpack-cli --save-dev (ULBI: "webpack":"^5.96.1","webpack-cli":"^5.1.4")
   3.2. создаем webpack.config.js командой npx webpack --config webpack.config.js
   3.3 при заполненных entry и output в конфиге вэбпака, можем его запустить командой 'npx webpack'
4. задаем динамический нэйминг для бандла в конфиге
5. создаем public, index.html
   5.1. подтягиваем плагины вэбпака (html-webpack-plugin)
   5.2. вписываем в конфиг плагины и задаем template для HtmlWebpackPlugin
6. добавил команду npm run build прописав в packaje.json в скриптах "build": "webpack"
7. добавляем npm install --save-dev typescript ts-loader в дев зависимости (для исходного кода)
   7.1. перемсеновываем index.js на index.ts и создаем tsconfig.json
   7.2. дописываем в конфиг вэбпака свойства module и resolve
8. пишем конфигурацию Webpack на TypeScript npm install --save-dev typescript ts-node @types/node @types/webpack
   8.1. переписываем webpack.konfig с js на ts
   8.2. переписываем импорты
   8.3. добавляем в tsconfig "allowSyntheticDefaultImports": true, "esModuleInterop": true
   8.4. выносим конфиг в идентификатор config с типом webpack.Configuration и импортируем его
   8.5. добавляем в tsconfig "ts-node":{"compilerOptions":{"module":"CommonJS"}}

---

2 Декомпозиция конфига branch: startDev/webpack/configDecompose/2

1. в корне проекта создаем папку config (здесь будет храниться вся конфигурация приложения)
   1.2. создаем config/build - тут будуь наши конфигурации сборок
   1.2.1. создаем внутри config/build такие файлы как buildLoaders, buildPlugins, buildResolvers
   1.3 декомпозируем плагины, лоадеры и резолверы из вэбпакконвига в buildLoaders, buildPlugins, buildResolvers
2. в buildPlugins.js устанавливаем динамические пути
   2.1 создаем внутри config/build еще одну диру types
   2.2. создаем внутри config/build/types config.ts и тип в котором напишем опции сборки
3. создаем внутри config/build еще один файл buildWebpackConfig.ts

---

3 Webpack-dev-server. Переменные окружения (env) branch: startDev/webpackDevServer/dotEnv
