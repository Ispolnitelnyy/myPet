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

1. вписываем devtool: "inline-source-map" в buildWebpackConfig для того чтобы узнать из какого исходного файла происходит ошибка
   1.1 выбираем инструмент Webpack-dev-server npm install --save-dev webpack-dev-server и типы npm install --save-dev @types/webpack-dev-server
   1.2 в config/build создаем buildDevServer.ts
2. добавляем порт, прокидываем его в buildWebpackConfig.ts
   2.1 в buildWebpackConfig.ts дописываем и передаем порт devServer: buildDevServer(порт)
   2.2 в buildDevServer дописываем open: true, //автоматически рвет страницу с нашим приложением
   2.3 добавляем "start": "webpack serve" в package.json
3. Разделяем dev сборку от production (Environment Variables (env))
   3.1 в package.json добавляем "build:prod": "webpack --env mode=production", "build:dev": "webpack --env mode=development"
   3.2 Чтобы использовать переменную env, вы должны преобразовать module.exports в webpack.config.ts в функцию export default (env) => {return config};
   3.3 в buildWebpackConfig.ts используем флаг (для source-map) : devtool:isDev?"inline-source-map":undefined, devServer:isDev?buildDevServer(options):undefined
   на выходе получаем 3 команды npm run build:dev , npm run build:prod npm run start

---

4 Подключаем React и настраиваем css в branch: webpack react/cssInWebpack

1. npm i react react-dom, npm i - D @types/react @types/react-dom
2. npm install sass-loader sass webpack style-loader css-loader --save-dev
3. добавляем лоадер для scss из доки в buildLoaders.ts

---

5 Настраиваем css modules branch: cssModules

1. будем использовать специальный плагин: MiniCssExtractPlugin npm install --save-dev mini-css-extract-plugin
   1.1 ставим плагин в buildLoaders и задаем динамический нэйминг на fileName, а так же создаем 1 чанк chunkFilename: "css/[name].[contenthash:8].css"
   1.2 так же дока предлставляет css loader ставим его в buildLoaders.ts вместо "style-loader" в продакшн версии
   (!!! css-loader выше 6.11.0 версии багнутый и не корректно выводит импорт модулей scss файлов !!!)
2. настраиваем css модули: для корректного импорта модульных css и scss файлов добавляем декларацию модуля в global.d.ts
   (не знаю по какой причине, но тип импорта для scss и css файлов в global.d.ts не подсказывает через IDE доступные варианы,
   нашел решение в сторонней либе: "typed-scss-modules", она под каждым css, scss файлом создает index.module.d.scss и вписывает туда доступные типы, что решает проблему npx typed-scss-modules src . `в будующем надо разобраться, как записывать все типы в global.d.ts)

---

6 Роутинг Code splitting Lazy Suspence branch: routers/reactLazy

1. нвастраиваем роутинг: npm i react-router-dom, npm i -d @types/react-router-dom
2. прописываем Routes в App.tsx
3. добавляем Link в App.tsx для перехода между страничками
4. дописываем в webpack dev server свойство historyApiFallback: true для проксирования запросов через корневой src/app/index.tsx
5. разбиваваем наше spa приложение:
   5.1. разбиваем страницы на отдельные бандлы путем информирования о других страницах в основном чанке бандла, а оставшиеся страничные чанки будут подгружаться асинхронно
   (такой подход называется - asyncChanks, codeSplitting, lazyLoading) в реакте это делается с помощью спец компонентов: lazy и suspence
   создаем специальный страничный компонент с приставкой lazy или async ( я создал отдельную диру pagesLazy)

---

7 Организация стилей. Установка своего шрифта. Добавляем темы, Контекст для состояния темы branch:organization/styles

1. создаем рутовые стили которые будут обнулять или задавать поведение дефолтным
2. создаем корневой index.scss для нашего компонента App
3. создаем папку variables/global с переменными которые мы будем переиспользовать (размер текста, сам Шрифт)
   3.1. поскольку я установил шрифт локально src\styles\assets\fonts\Michroma-Regular.ttf то и нужно его прогонять через webpack
   3.2. в buildLoaders добавляем лоудер для шрифтов и задаем ему правила
   3.3. в конфиге webpack в buildWebpackConfig дописываем свойство assetModuleFilename
   3.4 в корневом scss инициализиркем сам шрифт и уже потом вписывем его назавание в нашем variables/global scss

---

`
`
`
`
`
`
`
`
`
`
`
`
`
`
rm -rf ./.webpack-cache && rm -rf ./dist
Перезапустите TypeScript сервер: (Ctrl + Shift + P), и выбрав "TypeScript: Restart TS server".
