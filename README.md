# myPet

---

Основы webpack, Добавление TS

1. npm init -y
2. создаем src, index.js
3. [webpack.js.org](https://webpack.js.org/guides/getting-started/#basic-setup)
   3.1. npm install webpack webpack-cli --save-dev (ULBI: "webpack":"^5.96.1","webpack-cli":"^5.1.4")
   3.2. создаем webpack.config.js командой npx webpack --config webpack.config.js
   3.3 при заполненных entry и output в конфиге вэбпака, можем его запустить командой 'npx webpack'
4. задаем динамический нэйминг для бандла в конфиге
5. создаем public, index.html
   5.1. подтягиваем плагины вэбпака (html-webpack-plugin)
   5.2. вписываем в конфиг плагины и задаем template для HtmlWebpackPlugin
6. добавил команду npm run build прописав в packaje.json в скриптах "build": "webpack"
7. добавляем npm install --save-dev typescript ts-loader в дев зависимости (для исходного кода)
   9.1. перемсеновываем index.js на index.ts и создаем tsconfig.json
   9.2. дописываем в конфиг вэбпака свойства module и resolve
8. пишем конфигурацию Webpack на TypeScript npm install --save-dev typescript ts-node @types/node @types/webpack
   10.1. переписываем webpack.konfig с js на ts
   10.2. переписываем импорты
   10.3. добавляем в tsconfig "allowSyntheticDefaultImports": true, "esModuleInterop": true
   10.4. выносим конфиг в идентификатор config с типом webpack.Configuration и импортируем его
   10.5. добавляем в tsconfig "ts-node":{"compilerOptions":{"module":"CommonJS"}}

---

Декомпозиция конфига:

1. в корне проекта создаем папку config (здесь будет храниться вся конфигурация приложения)
   1.2. создаем config/build - тут будуь наши конфигурации сборок
   1.2.1. создаем внутри config/build такие файлы как buildLoaders, buildPlugins, buildResolvers
   1.3 декомпозируем плагины, лоадеры и резолверы из вэбпакконвига в buildLoaders, buildPlugins, buildResolvers
2. в buildPlugins.js устанавливаем динамические пути
   2.1 создаем внутри config/build еще одну диру types
   2.2. создаем внутри config/build/types config.ts и тип в котором напишем опции сборки
3. создаем внутри config/build еще один файл buildWebpackConfig.ts
