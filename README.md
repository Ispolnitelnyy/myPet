# myPet

CLI:

-  почистить кэш вэбпака: rm -rf ./.webpack-cache && rm -rf ./dist
-  перезапустить TypeScript сервер: (Ctrl + Shift + P), выбрать "TypeScript: Restart TS server".

декларации для импорта scss модулей - npm run decloration (для варианта с cli (npx typed-scss-modules src/app/components))
увидеть ошибки ts - npm run lint:ts  
исправить ошибки ts- npm run lint:ts:fix  
увидеть ошибки scss - npm run stylelint:scss  
исправить ошибки scss- npm run stylelint:scss:fix

---

1 Основы webpack, Добавление TS  
branch:  
startDev/webpack/typescript/1

1. npm init -y
2. создаем src, index.js
3. [webpack.js.org]  
   3.1. npm install webpack webpack-cli --save-dev  
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

2 Декомпозиция конфига  
branch:  
startDev/webpack/configDecompose/2

1. в корне проекта создаем папку config (здесь будет храниться вся конфигурация приложения)  
   1.2. создаем config/build - тут будуь наши конфигурации сборок  
   1.2.1. создаем внутри config/build такие файлы как buildLoaders, buildPlugins, buildResolvers  
   1.3 декомпозируем плагины, лоадеры и резолверы из вэбпакконвига в buildLoaders, buildPlugins, buildResolvers
2. в buildPlugins.js устанавливаем динамические пути  
   2.1 создаем внутри config/build еще одну диру types  
   2.2. создаем внутри config/build/types config.ts и тип в котором напишем опции сборки
3. создаем внутри config/build еще один файл buildWebpackConfig.ts

---

3 Webpack-dev-server. Переменные окружения (env)  
branch:  
startDev/webpackDevServer/dotEnv

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

4 Подключаем React и настраиваем css в  
branch:  
react/cssInWebpack

1. npm i react react-dom, npm i - D @types/react @types/react-dom
2. npm install sass-loader sass webpack style-loader css-loader --save-dev
3. добавляем лоадер для scss из доки в buildLoaders.ts

---

5 Настраиваем css modules  
branch:  
cssModules

1. будем использовать специальный плагин: MiniCssExtractPlugin npm install --save-dev mini-css-extract-plugin  
   1.1 ставим плагин в buildLoaders и задаем динамический нэйминг на fileName, а так же создаем 1 чанк chunkFilename: "css/[name].[contenthash:8].css"  
   1.2 так же дока предлставляет css loader ставим его в buildLoaders.ts вместо "style-loader" в продакшн версии  
   (!!! css-loader выше 6.11.0 версии багнутый и не корректно выводит импорт модулей scss файлов !!!)
2. настраиваем css модули: для корректного импорта модульных css и scss файлов добавляем декларацию модуля в global.d.ts  
   (не знаю по какой причине, но тип импорта для scss и css файлов в global.d.ts не подсказывает через IDE доступные варианы,  
   нашел решение в сторонней либе: "typed-scss-modules", она под каждым css, scss файлом создает index.module.d.scss и вписывает туда доступные типы, что решает проблему npx typed-scss-modules src/app . `в будующем надо разобраться, как записывать все типы в global.d.ts)

---

6 Роутинг Code splitting Lazy Suspence  
branch:  
routers/reactLazy

1. нвастраиваем роутинг: npm i react-router-dom, npm i -d @types/react-router-dom
2. прописываем Routes в App.tsx
3. добавляем Link в App.tsx для перехода между страничками
4. дописываем в webpack dev server свойство historyApiFallback: true для проксирования запросов через корневой src/app/index.tsx
5. разбиваваем наше spa приложение:  
   5.1. разбиваем страницы на отдельные бандлы путем информирования о других страницах в основном чанке бандла, а оставшиеся страничные чанки будут подгружаться асинхронно  
   (такой подход называется - asyncChanks, codeSplitting, lazyLoading) в реакте это делается с помощью спец компонентов: lazy и suspence  
   создаем специальный страничный компонент с приставкой lazy или async ( я создал отдельную диру pagesLazy)

---

7 Организация стилей. Установка своего шрифта. Добавляем темы, Контекст для состояния темы  
branch:  
organization/styles

1. создаем рутовые стили которые будут обнулять или задавать поведение дефолтным
2. создаем корневой index.scss для нашего компонента App
3. создаем папку variables/global с переменными которые мы будем переиспользовать (размер текста, сам Шрифт)  
   3.1. поскольку я установил шрифт локально src\styles\assets\fonts\Michroma-Regular.ttf то и нужно его прогонять через webpack  
   3.2. в buildLoaders добавляем лоудер для шрифтов и задаем ему правила  
   3.3. в конфиге webpack в buildWebpackConfig дописываем свойство assetModuleFilename  
   3.4 в корневом scss инициализиркем сам шрифт и уже потом вписывем его назавание в нашем variables/global scss

---

8,9 Рефакторинг: перевожу на переиспользуемость (близкое к фсд) , чтобы а дальнейшем на этом этапе применить различные stateManagers  
branch:  
refactor

---

10 продожаем придерживаться архитекруры fsd, занимаемся структурированием папок  
branch:  
architecture

1. создание public API на примере providers/themeProviders оставлю там комментарий
2. добавление абсолютных путей в конфиге тс прописываем "baseUrl", "paths",
3. дружим конфиг вэбпака с абсолютными путями (resolvemodules) в резолв необходимо добавить элиасы, и свойство preferAbsolute:true (приоритет на абсолютные пути)  
   3.1. так же дописываем modules: указываем корневой откуда брать абсолютный путь (src) и еще node_modules  
   3.2. настройка алиасов, можно обращаться через @ где @ : path.src (@/pages/homePage) ------ (возможно сделаю на 2 ветке через @)  
   3.2.1 но если оставить алиасы пустыми {} и прямо указать prefer absolute (абсолютный путь в нашем случае src), то в таком случае можеи обращаться на прямую (/pages/homePage), так же если указать свойство mainFiles, в таком случае для каждого модуля будет приоритетным файл index

---

11 AppRouter. Конфиг для роутера  
branch:  
appRouter/routerConfig

1. coздаем диру providers/route чтобы в дальнейшем вытащить роуты через Public Api
2. создаем диру config/routes в shared на уровне с halpers, вписываем туда в routeConfig необходимые имена(AppRoutesEnum), пути роутов(RoutePath) и значения(страницу)
3. в providers/route мапим routeConfig и в мапе выводим стандартный <Route/>
4. в паблик апи вытаскиваем компонент из providers/route и передаем его в App

---

12 Navbar. Шаблоны для разработки. Первый UI Kit компонент  
branch:  
navBar

починились шрифты :D

---

13 Svg loader. File loader. Button UI kit.  
branch:  
loaders-SVG-File/UI-kit-button

1. загрузка лоудера для файлов: npm install file-loader --save-dev
2. создание переиспользуемого ui kit для компонента button

---

14 Sidebar. Layout приложения  
branch:  
sidebar/app-layout

только верстка

---

15 i18n Интернационализация. Define plugin. Плагин для переводов (Последняя ветка с ним stylelint/i18nPlugin)  
branch:  
definePlagin-for-translator

DefinePlugin- для глобальных переменных  
надо будет персмотреть видос если будут нужны переводы, фича не частая, для примера оставлю, теперь есть где искать  
в рутовом компоненте закомментил импорт, так как бандл стал в 2 раза больше из-за перевода

---

16 react-refresh-webpack-plagin  
branch:  
react-refresh-webpack-plagin

тянем необходимые пакеты npm install --save-dev @pmmmwh/react-refresh-webpack-plugin react-refresh
устанавливаем HotModuleReplacementPlugin и ReactRefreshWebpackPlugin в массив плагинов
прописываем в devserver свойство hot: true

---

17 Babel. Extract plugin  
branch:  
Babel/extractPlagin
если бы мы не использовали typescriptLoader нам бы в любом случае пришлось бы настраивать babel

качаем бабель: npm install --save-dev babel-loader @babel/core  
создаем babelLoader  
качаем пакет для новых ES перобразований npm install @babel/preset-env --save-dev
прописываем в babelLoader в регулярку ts и tsx  
!!!Важно!!! в массиве лоудеров babelLoader должен быть первее typescriptLoader

далее подключаем babel-plugin-i18next-extract плагин который может извлекать ключи в формате JSONv4. для i18n npm i --save-dev babel-plugin-i18next-extract  
инициализируем этот плагин в babel.config.json  
так же добавляем плагин в babelLoader
указываем какие функции он должен будет выполнять: locales, keyAsDefaultValue

---

18 Настраиваем EsLint. Исправляем ошибки  
branch:  
inject-eslint  
(короче новый еслинт не ищет ошибки в файлах ts/tsx, поставил сомнительный конфиг, но хотябы видны ошибки при прогоне)

https://typescript-eslint.io/getting-started/  
npm install --save-dev eslint @eslint/js typescript typescript-eslint
сщздаем в корне eslint.config.mjs
вписывам согласно доке  
для прогона через cli вводим: (npx eslint .)

увидеть ошибки - npm run lint:ts:
исправить ошибки - npm run lint:ts:fix:

---

19 Stylelint. Plugin for i18next  
branch:  
stylelint/i18nPlugin

https://stylelint.io/user-guide/get-started  
npm install --save-dev stylelint stylelint-config-standard-scss  
создаем конфиг .stylelintrc.json

увидеть ошибки - npm run stylelint:scss  
исправить ошибки - npm run stylelint:scss:fix

---

ПРОБУЮ УСТАНОВИТЬ ЕСЛИНТ СТАРОЙ ВЕРСИИ  
для создания конфига: npm init @eslint/config  
удалить еслинт глобально npm uninstall -g eslint  
не получилось - последняя доступная версия 8.57.1  
yстанавливаю посдеднюю:  
`$ npm list eslint  
mypet@1.0.0 D:\code\myPet  
├─┬ @typescript-eslint/eslint-plugin@8.16.0  
│ ├─┬ @typescript-eslint/type-utils@8.16.0  
│ │ └── eslint@9.16.0 deduped  
│ ├─┬ @typescript-eslint/utils@8.16.0  
│ │ └── eslint@9.16.0 deduped  
│ └── eslint@9.16.0 deduped  
├─┬ @typescript-eslint/parser@8.16.0  
│ └── eslint@9.16.0 deduped  
├─┬ eslint-plugin-react@7.37.2  
│ └── eslint@9.16.0 deduped  
└─┬ eslint@9.16.0  
  └─┬ @eslint-community/eslint-utils@4.4.1  
    └── eslint@9.16.0 deduped`  
\_\_\_  
пошел в доку https://eslint.org/docs/latest/use/getting-started  
 там предлагается команда npm init @eslint/config@latest

короче я ебал, в этот конфиг не могу прописать правила на импорт реакта и не используемые переменные
оставлю пока так, потом разберусь, в любом случае для исправления еслинт больше не доступен, только подчеркивания неправильного синтаксиса и проблем(для чего собственно он и нужен), а уже для исправлений благо есть притер для коррекции кода  
продолжаю 19 - Plugin for i18next
npm i eslint-plugin-i18next для того чтобы подсвечивал места в которых нужен перевод  
далее по доке в еслин конфиг вкидываем import i18next from 'eslint-plugin-i18next'; и сам конфиг `export default [ // your other configs,  i18next.configs['flat/recommended'],];`  
на удивление все заработало, я оставлю для примера в этой ветке, но в дальнейшем избавлюсь от этой фичи с переводами

---

20 Тестовая среда. Настраиваем Jest. Пишем первый тест
branch:  
jest

убрал с еслинта проверку на перводы из предыдущей темы, поменял немного цвета в теме, убрал пример переводчика на main Page - комит: [jest b305355] refactor theme colors, and translator on main page

тянем пакет с джестом: npm install --save-dev jest  
дока предлагает npm init jest@latest , но я попробую npx jest --init  
пошел по 2 этапу  
перкинул конфиг джеста папку конфиг(иам где у нас лежит декомпозированный конфиг вэбпака)
подтягиваем типы для jest: npm i --save-dev @types/jest
Jest поддерживает TypeScript через Babel. Во-первых, убедитесь, что вы следовали инструкциям по использованию Babel выше. Затем установите(без него прогононяются, удалил npm install --save-dev @babel/preset-typescript)
так же jpt советует поставить npm install --save-dev ts-jest и (без него прогононяются, удалил npm install --save-dev babel-jest)
потом зашел сюда
https://kulshekhar.github.io/ts-jest/docs/getting-started/installation/#jest-config-file
и это помогло
резюмируя: поставил только: "jest": "^29.7.0", "@types/jest": "^29.5.14", "ts-jest": "^29.2.5", в конфиге джеста добавил: preset: "ts-jest" и `transform: {"^.+.tsx?$": ["ts-jest",{}],}`

---

21 Несуществующие маршруты. Лоадер для загрузки страниц  
branch:  
404Page/loader/spiner

наконец то настроил Eslint!  
https://ru.stackoverflow.com/questions/1593408/%D0%9A%D0%B0%D0%BA-%D0%BD%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B8%D1%82%D1%8C-eslint-%D0%B2-vs%D0%A1ode  
тут увидел у типа пример с новыми настройками  
Понял как работает:  
теперь вместо отдельно прописанного плагина и его правил в rules используется импорт этого плагина и конкретная конфигурация котороя обладает теми или иными списком правил!  
изменил конфигурации:

1. pluginReact/"eslint-plugin-react": "^7.37.2", - вместо рекомендованных поставил правила jsx-runtime конфигурации, чтобы не проверял на импорт реакта
2. tseslint/"typescript-eslint": "^8.16.0" - вместо рекомендованных (там проверка на неиспользуемые объявленные переменные) поставил правила stylistic где есть проверка на правильное наследование и определение типов (напимер, предпочтительным способом записи объекта является использование Record вместо явного определения индексного сигнатура { [classname: string]: string }, а так же обеспечение последовательного использования в определениях типов либо, interface либо type)

3. для 404 страницы в роутах нужно указать `path = /*`
4. добавлен готовый лоудер на suspence fallback и декомпозирован для переиспользования

---

22 ErrorBoundary. Обработка React ошибок  
branch:  
errorBounary

1. для эмуляции ошибки в app напишем юзэффект в котором будем пробрасывать ошибку `useEffect(()=>{throw new Error();},[]);`
2. идем в доку реакта по ErrorBoundary компоненту и берем оттуда сниппет, создаем в providers сам компонент ErrorBoundary
3. оборачиваем app в ErrorBoundary как по аналогии c ThemeProvider
4. декомпозируем сам ui страницы ошибки в слой widgets/errorBoundaryPage
5. для удобства отключил через cssReset `<iframe id="react-refresh-overlay">` об ошибке `body > iframe {display: none;}`
6. убираем useEffect, делаем кнопу (Тестовый компонент) для вызова ошибки и ее отлова
7. возвращаю `<iframe id="react-refresh-overlay">`

---

23 Анализ размера банда. BundleAnalyzer  
branch:  
WebpackBundleAnalyzer

для анализа размера бандла у вебпака есть специальны плагин npm install --save-dev webpack-bundle-analyzer  
так же надо сразу установить @types/webpack-bundle-analyzer
чтобы он не открывался нужно передать свойство с флагом `new BundleAnalyzerPlugin({openAnalyzer: false}),` (в консоли будет ссылка на него `http://127.0.0.1:8888`)

---

24 React Testing Library. Тесты на компоненты  
branch:  
ReactTestingLibrary

открываем доку, тянем пакеты `npm install --save-dev @testing-library/react @testing-library/dom`  
так же для ts `npm install --save-dev @testing-library/react @testing-library/dom @types/react @types/react-dom`  
для квик старта `https://www.robinwieruch.de/react-testing-library/`

отсутствет метод toBeInTheDocument  
для того чтобы он появился нужен пакет для работы с домом jest-dom `npm install --save-dev @testing-library/jest-dom`  
так же пакет с окружением @jest-environment-jsdom npm i --save-dev jest-environment-jsdom и записываем в jest.config.ts строку testEnvironment: 'jsdom'  
создаем setupTest.ts рядом с jest.config.ts импотрируемся import '@testing-library/jest-dom'  
переходим в jest.config.ts, добавляем `setupFilesAfterEnv: ["<rootDir>/config/test/setupTest.ts"],`  
при использовании TypeScript, убедиться, что файл установки .ts и не .js, чтобы включить необходимые типы.  
необходимо будет включить свой файл установки в tsconfig.json  
добавляем туда правило `"include": ["./config/test/setupTest.ts", "**/*.ts", "**/*.tsx"],`  
теперь метод должен быть доступен  
Mocking CSS Modules `npm install --save-dev identity-obj-proxy`  
добавляем из доки `moduleNameMapper: {"\\.(s?css)$": "identity-obj-proxy",}` в jest.config.ts

/
устанавливаем приссет бэйбла для ts `npm install --save-dev @babel/preset-typescript`  
прописываем присет в babel.config.json `"@babel/preset-typescript",`  
(работает без него)  
устанавливаем приссет бэйбла для react `npm install --save-dev react-test-renderer`  
прописываем присет в babel.config.json `["@babel/preset-react",{"runtime":"automatic"}] `
(работает без него)  
ИТОГ: присеты не влияют

для компонентов использующих svg и тд нужно настроить импорты
тем в jest.config.ts, из за ранее установлного svgLoader (@svgr/webpack отвечает за преобразование SVG в компоненты React) который импортирует svg как компоненты мы можем использовать мапер:  
`moduleNameMapper: {"\\.svg": path.resolve(__dirname, "./mockComponent/jestEmptyComponent.tsx")},`  
Файл jestEmptyComponent.tsx используется в сочетании с настройкой moduleNameMapper в Jest, чтобы подменять реальные импорты SVG-файлов на пустой компонент при тестировании. Jest не понимает, как обрабатывать SVG-файлы по умолчанию. Если SVG-файлы импортируются как компоненты (например, с помощью @svgr/webpack), они могут вызывать ошибки, поскольку Jest не выполняет сборку с Webpack. SVG-файлы часто, не влияют на логику компонента. Поэтому вместо обработки реального SVG достаточно заменить его на простой React-компонент  
Проще говоря jestEmptyComponent.tsx - это мок для тестирования которы присутствует для всех импоротов расширений svg  
создаем собстаенно в дире jest.config.ts диру для моеового компонента /mockComponent/jestEmptyComponent.tsx где будет рендер 1 `<div/>`

связываем тесты и библиотеку i18next : `https://react.i18next.com/misc/testing`  
Для целей тестирования компонента надо экспортировать чистый компонент без расширения с помощью Translation hoc ( пример: 8-9 строчка langSwitherButton.test.tsx)  
Далее нам нужен раздел: Testing without stubbing  
создаем конфг для тестов (\shared\configs\routes\i18n\i18nForTests\index.ts)
для удобства использования этого конфига создаем хелпер который в будущем можно будет использовать во всех тестах (\shared\helpers\tests\renderWithTranslation\index.tsx)создаем функцию и оборачиваем по примеру из доки теста с использованием этой конфигурации `<I18nextProvider i18n={i18n}>{component}</I18nextProvider>`
осталось использовать эту функцию для рендера компонента в langSwitherButton.test.tsx (пример: 10 строчка)

тест на сворачивание и разворачивание sideBar:  
у нас применяется динамический нейминг классов за счет обновления состояния сайтбара  
класс collapsed динамически добавляется через setState, но тест не ждёт обновления состояния  
кроме того, используемый класс — `src-app-components-widgets-sideBar-index-module__collapsed--hash`, так как в проекте используются CSS-модули (identity-obj-proxy: Заменяет хэшированные классы на читаемые в тестах)

1. добавим поддержку CSS-модулей в тестах (в jest.config.ts настроим `moduleNameMapper:{"\\.module\\.scss$": "identity-obj-proxy",}` чтобы маппить CSS-модули на простые объекты) это позволит в тестах использовать оригинальные имена классов, такие как collapsed
2. в компоненте используется setTimeout для обновления состояния. (jest.useFakeTimers чтобы дождаться изменений) (а так же использовать waitFor для ожидания изменения класса)

---

25 Настраиваем Storybook. Декораторы. Стори кейсы на компоненты
branch:  
storyBook/decorators/storyCases-on-components

лезем в доку `https://storybook.js.org/blog/storybook-for-webpack-5/`
For a fresh Storybook install: `npx sb init --builder webpack5`
в корне проекта появляется папка .storybook (уюираем точку, переносим ее в папук config где лежит вэбпак, в файлe main.ts меняем путь, на выход на 1 дирректорию `stories: ["../../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"]` )
меняем команды для запусков скриптов дописываем путь `"storybook": "storybook dev -p 6006 -c ./config/storybook",`
(возможно дальше откачу обратно)  
теперь напишем первую сторис, но уже для своего компонента: `src\app\components\shared\ui\button\button.stories.tsx`
копируем из примера `src\stories\Button.stories.ts` код и переносим к себе
теперь папку с примерами `src\stories` можно удалить
при первом запуске сталкивамся с проблемой абсолютных импортов:

1. `https://storybook.js.org/docs/6/builders/webpack`  
   По умолчанию Storybook обеспечивает поддержку нулевой конфигурации для Webpack и автоматически настраивает базовую конфигурацию, созданную для работы с наиболее распространенными вариантами использования - мы можем расширять ее (например, .storybook/main.ts) и переопределять под свои нужды
   Для переопределения конфига выберем следующий способ:
   создаем `корень\config\storybook\webpack.config.ts`
   создаем и экспортруем функцию которая будет перезаписывать нашу конфигурацию вебпака сторибука
   1.1. в контексте абсолютгых путей нам необходимо изменить в исходном вэбпак конфиге сторибука resolve в котором нужно переопределить extension and modules
   пример в `config\storybook\webpack.config.ts`
   1.2. теперь настроим имопрт scss модулей для вэбпак конфига сторибука, по умолчанию он с ними работать не умеет  
   за основу возьмем cssLoader ранее использующийся в основном конфиге вебпака  
   --- сделал мини рефакторинг: вынес лоудеры в отдельную функуию (getLoader), чтобы использовать лоудеры как в основном вэбпак конфиге проекта, так и в массив rules конфига вэбпака сторибука  
   1.3. Строрибуку не нравится отсутствующий импорт реакта, здесь нам подойдут presets бабеля которые ранее не помогали для Jest
   раскомитил присеты `preset-typescript, [preset-react",{"runtime":"automatic"}]` в babel.config.json и в самом babelLoader, запушил babelLoader в массив rules конфига вэбпака сторибука

Настала ебала
storybook посылает нахуй глобальные scss переменные
я прообовал и лоудеры менять и импортировать ввезде их где только можно итог один - хуй тебе а не использование глобальных переменных
в инете нет нормального решения этой хуйни, выход только один - последовать примеру storybook и послать scss нахуй!
ну а ничего с ними не сделаешь кроме как держать в роли заметки, и подглядывать объявляя в модуле их значения из заметки

я хуй его знает как, но помогло импортировать декоратор с темами непосредсвенно в саму сторю причем не важно где будет импорт стилей, в сторе или в декораторе  
для перфоманса оставлю импорт стилей в декораторе
Ключевое - preview.tsx вообще бесполезный, ни декоратор, ни стили туда импортировать не надо! (почти каждое решение я находил именно с импортом в preview.tsx)  
я ебал... у меня ушло много времени на это /Storybook 8.4.6/
коммитимся

---

что еще сделать:  
смена шрифта, так как Михрома не поддерживает русскую раскладку (подключить не через локальный шрифт)  
деклорация через 1 глобальную деклорацию scss модулей  
https://www.youtube.com/watch?v=MvnTwjAjhic - посмотреть про новый Eslint  
метод toBeInTheDocument - посмотреть что делает в ролике про тесты  
storybook посылает нахуй глобальные scss переменные
