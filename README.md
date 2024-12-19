# myPet

Scripts start:  
декларации для импорта scss модулей - `npm run decloration` (для варианта с cli `npx typed-scss-modules src/app/components`)  
увидеть ошибки ts - `npm run lint:ts`  
исправить ошибки ts- `npm run lint:ts:fix`  
увидеть ошибки scss - `npm run stylelint:scss`  
исправить ошибки scss- `npm run stylelint:scss:fix`

---

1 Основы webpack, Добавление TS  
branch:  
startDev/webpack/typescript/1

1. `npm init -y`
2. создаем `src/index.js`
3. `[webpack.js.org] `
   3.1. `npm install webpack webpack-cli --save-dev`  
   3.2. создаем `webpack.config.js` командой `npx webpack --config webpack.config.js`  
   3.3 при заполненных `entry` и `output` в конфиге вэбпака, можем его запустить командой `npx webpack`
4. задаем динамический нэйминг для бандла в конфиге
5. создаем `public/index.html`  
   5.1. подтягиваем плагины вэбпака `html-webpack-plugin`  
   5.2. вписываем в конфиг плагины и задаем `template` для `HtmlWebpackPlugin`
6. добавил команду `npm run build` прописав в `packaje.json` в скриптах `"build": "webpack"`
7. добавляем `npm install --save-dev typescript ts-loader` в дев зависимости (для исходного кода)  
   7.1. переменовываем `index.js` на `index.ts` и создаем `tsconfig.json`  
   7.2. дописываем в `webpack.config` свойства `module` и `resolve`
8. пишем конфигурацию Webpack на TypeScript `npm install --save-dev typescript ts-node @types/node @types/webpack`  
   8.1. переписываем `webpack.config` с js на ts  
   8.2. переписываем импорты  
   8.3. добавляем в `tsconfig:` `"allowSyntheticDefaultImports": true, "esModuleInterop": true`  
   8.4. выносим конфиг в идентификатор config с типом `webpack.Configuration` и импортируем его  
   8.5. добавляем в `tsconfig`: `"ts-node":{"compilerOptions":{"module":"CommonJS"}}`

---

2 Декомпозиция конфига  
branch:  
startDev/webpack/configDecompose/2

1. в корне проекта создаем папку `config` (здесь будет храниться вся конфигурация приложения)  
   1.2. создаем `config/build` - тут будуь наши конфигурации сборок  
   1.2.1. создаем внутри `config/build` такие файлы как `buildLoaders`, `buildPlugins`, `buildResolvers`  
   1.3 декомпозируем плагины, лоадеры и резолверы из вэбпакконвига в `buildLoaders`, `buildPlugins`, `buildResolvers`
2. в `buildPlugins.js` устанавливаем динамические пути  
   2.1 создаем внутри `config/build` еще одну диру `types`  
   2.2. создаем внутри `config/build/types` `config.ts` и тип в котором напишем опции сборки
3. создаем внутри `config/build` еще один файл `buildWebpackConfig.ts`

---

3 Webpack-dev-server. Переменные окружения (env)  
branch:  
startDev/webpackDevServer/dotEnv

1. вписываем `devtool: "inline-source-map"` в `buildWebpackConfig` для того чтобы узнать из какого исходного файла происходит ошибка  
   1.1 выбираем инструмент `Webpack-dev-server`: `npm install --save-dev webpack-dev-server` и типы `npm install --save-dev @types/webpack-dev-server`  
   1.2 в `config/build` создаем `buildDevServer.ts`
2. добавляем порт, прокидываем его в `buildWebpackConfig.ts`  
   2.1 в `buildWebpackConfig.ts` дописываем и передаем порт `devServer: buildDevServer(порт)`  
   2.2 в `buildDevServer` дописываем `open: true,` - автоматически рвет страницу с нашим приложением  
   2.3 добавляем `"start": "webpack serve"` в `package.json`
3. Разделяем dev сборку от production (Environment Variables (`env`))  
   3.1 в `package.json` добавляем `"build:prod": "webpack --env mode=production"`, `"build:dev": "webpack --env mode=development"`  
   3.2 Чтобы использовать переменную env, надо преобразовать `module.exports` в `webpack.config.ts` в функцию `export default (env) => {return config}`;  
   3.3 в `buildWebpackConfig.ts` используем флаг (для `source-map`) : `devtool:isDev?"inline-source-map":undefined`, `devServer:isDev?buildDevServer(options):undefined`  
   на выходе получаем 3 команды `npm run build:dev` , `npm run build:prod`, `npm run start`

---

4 Подключаем React и настраиваем css в  
branch:  
react/cssInWebpack

1. `npm i react react-dom`, `npm i -save-dev @types/react @types/react-dom`
2. `npm install sass-loader sass webpack style-loader css-loader --save-dev`
3. добавляем лоадер для SCSS из доки в `buildLoaders.ts`

---

5 Настраиваем css modules  
branch:  
cssModules

1. будем использовать специальный плагин: `MiniCssExtractPlugin`: `npm install --save-dev mini-css-extract-plugin`  
   1.1 ставим плагин в `buildLoaders` и задаем динамический нэйминг на `fileName`, а так же создаем 1 чанк `chunkFilename: "css/[name].[contenthash:8].css"`  
   1.2 так же дока предлставляет `css loader` ставим его в `buildLoaders.ts` вместо `style-loader` в продакшн версии
   ```
   css-loader выше 6.11.0 версии багнутый
   и не корректно выводит импорт модулей scss файлов
   ```
2. настраиваем css модули: для корректного импорта модульных css и scss файлов добавляем декларацию модуля в `global.d.ts`

```
   Не знаю по какой причине, но тип импорта для scss и css файлов
   в `global.d.ts` не подсказывает через IDE доступные варианы,
   нашел решение в сторонней либе: `typed-scss-modules`,
   она под каждым css, scss файлом создает `index.module.d.scss`
   и вписывает туда доступные типы, что решает проблему
   CLI: `npx typed-scss-modules src/app`
   в будующем надо разобраться, как записывать все типы в `global.d.ts`
```

---

6 Роутинг Code splitting Lazy Suspence  
branch:  
routers/reactLazy

1. нвастраиваем роутинг: `npm i react-router-dom`, `npm i --save-dev @types/react-router-dom`
2. прописываем `Routes` в `App.tsx`
3. добавляем `Link` в `App.tsx` для перехода между страничками
4. дописываем в `webpack dev server` свойство `historyApiFallback: true` для проксирования запросов через корневой `src/app/index.tsx`
5. разбиваваем наше SPA приложение:  
   5.1. разбиваем страницы на отдельные бандлы путем информирования о других страницах в основном чанке бандла, а оставшиеся страничные чанки будут подгружаться асинхронно  
   (такой подход называется - asyncChanks, codeSplitting, lazyLoading)  
   в реакте это делается с помощью спец компонентов: `lazy` и `Suspence`  
   создаем специальный страничный компонент с приставкой lazy или async  
   (я создал отдельную диру `pages/pagesLazy`)

---

7 Организация стилей. Установка своего шрифта. Добавляем темы, Контекст для состояния темы  
branch:  
organization/styles

1. создаем глобальные ` reset styles``src\app\styles\cssReset\index.scss ` которые будут обнулять или задавать поведение дефолтным
2. создаем корневой `src\app\styles\index.scss` для нашего компонента `App` (в дальнейшем повесим в `root/index.tsx` где все `routes` и `providers` из за порталов, так как порталы не в root классе)
3. создаем папку `src\app\styles\variables\global` с переменными которые мы будем переиспользовать (размер текста, шрифт, цвета)  
   3.1. поскольку я установил шрифт локально `src\styles\assets\fonts\Michroma-Regular.ttf` то и нужно его прогонять через webpack  
   3.2. в `buildLoaders` добавляем лоудер для шрифтов и задаем ему правила  
   3.3. в `webpack.config` в `buildWebpackConfig` дописываем свойство `assetModuleFilename`  
   3.4 в корневом SCSS инициализиркем сам шрифт и уже потом вписывем его назавание в нашем `variables/global/index.scss`

---

8,9 Рефакторинг: перевожу на переиспользуемость (близкое к фсд) , так как налепил много лишнего и структура по мере роста будет запутанной и не читабильной  
branch:  
refactor

---

10 продожаем придерживаться архитекруры `FSD`, занимаемся структурированием папок  
branch:  
architecture

1. создание `public API` на примере `providers/themeProviders` оставлю там комментарий
2. добавление абсолютных путей в `tsconfig.json` прописываем `"baseUrl"`, `"paths"`
3. дружим `webpack.config` с абсолютными путями `resolvemodules` в резолв необходимо добавить aлиасы, и свойство `preferAbsolute:true` (приоритет на абсолютные пути)  
   3.1. так же дописываем `modules`: указываем корневой (откуда брать абсолютный путь (src)) и еще `node_modules`  
   3.2. настройка алиасов, можно обращаться через `@` где `@ : path.src (@/pages/homePage)`  
   3.2.1 но если оставить алиасы пустыми `{}` и прямо указать `prefer absolute` (абсолютный путь в нашем случае `src`), то в таком случае можеи обращаться на прямую `/pages/homePage`, так же если указать свойство `mainFiles`, в таком случае для каждого модуля будет приоритетным файл `index`

---

11 AppRouter. Конфиг для роутера  
branch:  
appRouter/routerConfig

1. coздаем диру `providers/route` чтобы в дальнейшем вытащить роуты через Public Api
2. создаем диру `config/routes` в `shared` на уровне с `halpers`, вписываем туда в `routeConfig` необходимые имена(`AppRoutesEnum`), пути роутов(`RoutePath`) и значения(страницу)
3. в `providers/route` мапим `routeConfig` и в мапе выводим стандартный `<Route/>`
4. в Public Api вытаскиваем компонент из `providers/route` и передаем его в `<App/>`

---

12 Navbar. Шаблоны для разработки. Первый UI Kit компонент  
branch:  
navBar

ничего особенного, простое создание разметки и навешивание стилей на компонент `<Navbar/>`

---

13 Svg loader. File loader. Button UI kit.  
branch:  
loaders-SVG-File/UI-kit-button

1. загрузка лоудера для файлов: `npm install file-loader --save-dev`
2. создание переиспользуемого UI kit для компонента `<Button/>`

---

14 Sidebar. Layout приложения  
branch:  
sidebar/app-layout

по аналогии с компонентом `<Navbar/>` - простое создание разметки и навешивание стилей на компонент `<Sidebar/>`

---

15 i18n Интернационализация. Define plugin. Плагин для переводов (Последняя ветка с ним stylelint/i18nPlugin)  
branch:  
definePlagin-for-translator

`DefinePlugin` - для глобальных переменных таких как `__IS_DEV__`

```
надо будет персмотреть видос если будут нужны переводы,
фича не частая, для примера оставлю, теперь есть где искать
в рутовом компоненте закомментил импорт,
так как бандл стал в 2 раза больше из-за i18n
```

---

16 react-refresh-webpack-plagin  
branch:  
react-refresh-webpack-plagin

тянем необходимые пакеты `npm install --save-dev`, `@pmmmwh/react-refresh-webpack-plugin react-refresh`  
устанавливаем `HotModuleReplacementPlugin` и `ReactRefreshWebpackPlugin` в массив плагинов
прописываем в `devserver` свойство `hot: true`

---

17 Babel. Extract plugin  
branch:  
Babel/extractPlagin
если бы мы не использовали `typescriptLoader` нам бы в любом случае пришлось бы настраивать `babel`

качаем `babel`: `npm install --save-dev babel-loader @babel/core`  
создаем `babelLoader`  
качаем пакет для новых ES перобразований `npm install @babel/preset-env --save-dev`
прописываем в `babelLoader` в регулярку `ts` и `tsx`

```
Важно
В массиве лоудеров `babelLoader` должен быть первее
в индексе чем `typescriptLoader`
```

далее подключаем `babel-plugin-i18next-extract` плагин который может извлекать ключи в формате `JSONv4`.  
для `i18n` - `npm i --save-dev babel-plugin-i18next-extract`  
инициализируем этот плагин в `babel.config.json`  
так же добавляем плагин в `babelLoader`  
указываем какие функции он должен будет выполнять: `locales`, `keyAsDefaultValue`

---

18 Настраиваем EsLint. Исправляем ошибки  
branch:  
inject-eslint

```
короче новый еслинт не ищет ошибки в файлах ts/tsx,
поставил сомнительный конфиг, хотябы видны ошибки при прогоне
```

`https://typescript-eslint.io/getting-started/`  
`npm install --save-dev eslint @eslint/js typescript typescript-eslint`  
создаем в корне `eslint.config.mjs`
вписывам согласно доке  
для прогона через CLI вводим: `npx eslint .`

увидеть ошибки - `npm run lint:ts`
исправить ошибки - `npm run lint:ts:fix`

---

19 Stylelint. Plugin for i18next  
branch:  
stylelint/i18nPlugin

`https://stylelint.io/user-guide/get-started`  
`npm install --save-dev stylelint stylelint-config-standard-scss`  
создаем конфиг `.stylelintrc.json`

увидеть ошибки - `npm run stylelint:scss`  
исправить ошибки - `npm run stylelint:scss:fix`

---

```
ПРОБУЮ УСТАНОВИТЬ ЕСЛИНТ СТАРОЙ ВЕРСИИ
```

для создания конфига: `npm init @eslint/config`  
удалить еслинт глобально `npm uninstall -g eslint`

```
не получилось - последняя доступная версия `8.57.1`
yстанавливаю посдеднюю:

$ npm list eslint
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
```

пошел в доку `https://eslint.org/docs/latest/use/getting-started`  
там предлагается команда `npm init @eslint/config@latest`

```
короче я ебал, в этот конфиг не могу прописать правила на импорт реакта
и не используемые переменные оставлю пока так, потом разберусь,
в любом случае для исправления еслинт больше не доступен,
только подчеркивания неправильного синтаксиса и проблем
(для чего собственно он и нужен),
а уже для исправлений благо есть Prettier для коррекции кода
```

продолжаем:  
`npm i eslint-plugin-i18next` для того чтобы подсвечивал места в которых нужен перевод  
далее по доке в еслин конфиг вкидываем: `import i18next from 'eslint-plugin-i18next'`  
и сам конфиг: `export default [i18next.configs['flat/recommended'],]`

---

20 Тестовая среда. Настраиваем Jest. Пишем первый тест
branch:  
jest

```
убрал с eslint проверку на перводы из предыдущей темы,
поменял немного цвета в теме,
убрал пример переводчика на `<mainPage/>` -
комит: [jest b305355] refactor theme colors, and translator on main page
```

тянем пакет с jest тестами: `npm install --save-dev jest`  
дока предлагает `npm init jest@latest` , но я попробую `npx jest --init`  
пошел по 2 этапу:  
перкинул jest.config.ts джеста папку `myPet\config` (там где у нас лежит декомпозированный `webpack.config`)  
подтягиваем типы для jest: `npm i --save-dev @types/jest`  
Jest поддерживает TypeScript через Babel. Во-первых, убедитесь, что вы следовали инструкциям по использованию Babel выше.  
Затем установите (без него прогононяются, удалил `npm install --save-dev @babel/preset-typescript`)  
так же jpt советует поставить `npm install --save-dev ts-jest` (и без него прогононяются, удалил `npm install --save-dev babel-jest`)
потом зашел сюда  
`https://kulshekhar.github.io/ts-jest/docs/getting-started/installation/#jest-config-file`  
и это помогло  
резюмируя: поставил только: `"jest": "^29.7.0"`, `"@types/jest": "^29.5.14"`, `"ts-jest": "^29.2.5"`,  
в `jest.config.ts` добавил: `preset: "ts-jest"` и `transform: {"^.+.tsx?$": ["ts-jest",{}],}`

---

21 Несуществующие маршруты. Лоадер для загрузки страниц  
branch:  
404Page/loader/spiner

наконец то настроил Eslint!  
`https://ru.stackoverflow.com/questions/1593408/%D0%9A%D0%B0%D0%BA-%D0%BD%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B8%D1%82%D1%8C-eslint-%D0%B2-vs%D0%A1ode`  
тут увидел у типа пример с новыми настройками  
Понял как работает:  
теперь вместо отдельно прописанного плагина и его правил в rules
используется импорт этого плагина и конкретная конфигурация котороя обладает теми или иными списком правил!
изменил конфигурации плагинов:

1. `pluginReact/"eslint-plugin-react": "^7.37.2"` - вместо рекомендованных поставил правила `jsx-runtime` конфигурации, чтобы не проверял на импорт реакта
2. `tseslint/"typescript-eslint": "^8.16.0"` - вместо рекомендованных (там проверка на неиспользуемые объявленные переменные) поставил правила `stylistic` где есть проверка на правильное наследование и определение типов (напимер, предпочтительным способом записи объекта является использование утилиты `Record` вместо явного определения индексного сигнатура `{ [classname: string]: string }`, а так же обеспечение последовательного использования в определениях типов либо, `interface` либо `type`)

для 404 страницы в роутах нужно указать `path = /*`  
добавлен готовый `<Loader/>` на `<Suspence fallback = <Loader/>>` и декомпозирован для переиспользования

---

22 ErrorBoundary. Обработка React ошибок  
branch:  
errorBounary

1. для эмуляции ошибки в `<App/>` напишем useEffect в котором будем пробрасывать ошибку `useEffect(()=>{throw new Error();},[]);`
2. идем в доку реакта по `ErrorBoundary` компоненту и берем оттуда сниппет, создаем в `providers` сам компонент `<ErrorBoundary/>`
3. оборачиваем `<App/>` в `<ErrorBoundary/>` как по аналогии c `<ThemeProvider/>`
4. декомпозируем сам UI страницы ошибки в слой `widgets/errorBoundaryPage`
5. для удобства отключил через cssReset `<iframe id="react-refresh-overlay">` об ошибке `body > iframe {display: none;}`
6. убираем useEffect, делаем кнопу (Тестовый компонент) для вызова ошибки и ее отлова
7. возвращаю `<iframe id="react-refresh-overlay">`

---

23 Анализ размера банда. BundleAnalyzer  
branch:  
WebpackBundleAnalyzer

для анализа размера бандла у вебпака есть специальны плагин `npm install --save-dev webpack-bundle-analyzer`  
так же надо сразу установить `npm install --save-dev @types/webpack-bundle-analyzer`  
чтобы он не открывался нужно передать свойство с флагом `new BundleAnalyzerPlugin({openAnalyzer: false}),`  
(в консоли будет ссылка на него `http://127.0.0.1:8888`)

---

24 React Testing Library. Тесты на компоненты  
branch:  
ReactTestingLibrary

открываем доку, тянем пакеты `npm install --save-dev @testing-library/react @testing-library/dom`  
так же для ts `npm install --save-dev @testing-library/react @testing-library/dom @types/react @types/react-dom`  
для квик старта `https://www.robinwieruch.de/react-testing-library/`

отсутствет метод `toBeInTheDocument`  
для того чтобы он появился нужен пакет для работы с домом - `jest-dom`: `npm install --save-dev @testing-library/jest-dom`  
так же пакет с окружением `@jest-environment-jsdom`: `npm i --save-dev jest-environment-jsdom` и записываем в `jest.config.ts` строку `testEnvironment: 'jsdom'`  
создаем `setupTest.ts` рядом с `jest.config.ts` импотрируемся `import '@testing-library/jest-dom'`  
переходим в `jest.config.ts`, добавляем `setupFilesAfterEnv: ["<rootDir>/config/test/setupTest.ts"],`  
при использовании TypeScript, убедиться, что файл установки `.ts` и не `.js`, чтобы включить необходимые типы.  
необходимо будет включить свой файл установки в `tsconfig.json`  
добавляем туда правило `"include": ["./config/test/setupTest.ts", "**/*.ts", "**/*.tsx"],`  
теперь метод должен быть доступен  
`Mocking CSS Modules`: `npm install --save-dev identity-obj-proxy`  
добавляем из доки `moduleNameMapper: {"\\.(s?css)$": "identity-obj-proxy",}` в jest.config.ts

```
устанавливаем `presset` в babel для ts:
`npm install --save-dev @babel/preset-typescript`
прописываем `presset` в `babel.config.json`: `"@babel/preset-typescript"`
(работает без него)
устанавливаем `presset` бэйбла для react:
`npm install --save-dev react-test-renderer`
прописываем `presset` в `babel.config.json`:
`["@babel/preset-react",{"runtime":"automatic"}] `
(работает без него)
ИТОГ: присеты не влияют
```

для компонентов использующих `svg` и тд нужно настроить импорты  
тем в `jest.config.ts`, из за ранее установлного `svgLoader` (`@svgr/webpack` отвечает за преобразование `SVG` в компоненты React) который импортирует `svg` как компоненты мы можем использовать мапер:  
`moduleNameMapper: {"\\.svg": path.resolve(__dirname, "./mockComponent/jestEmptyComponent.tsx")},`  
Файл `jestEmptyComponent.tsx` используется в сочетании с настройкой `moduleNameMapper` в Jest, чтобы подменять реальные импорты SVG-файлов на пустой компонент при тестировании. Jest не понимает, как обрабатывать SVG-файлы по умолчанию. Если SVG-файлы импортируются как компоненты (например, с помощью `@svgr/webpack`), они могут вызывать ошибки, поскольку Jest не выполняет сборку с `Webpack`. SVG-файлы часто, не влияют на логику компонента. Поэтому вместо обработки реального SVG достаточно заменить его на простой React-компонент  
Проще говоря `jestEmptyComponent.tsx` - это мок для тестирования который присутствует для всех импоротов расширений `svg`  
создаем собстаенно в дире `jest.config.ts` диру для мокового компонента `/mockComponent/jestEmptyComponent.tsx` где будет рендер одного дива - `<div/>`

связываем тесты и библиотеку `i18next` : `https://react.i18next.com/misc/testing`  
Для целей тестирования компонента надо экспортировать чистый компонент без расширения с помощью `Translation hoc` ( пример: 8-9 строчка `langSwitherButton.test.tsx`)  
Далее нам нужен раздел: `Testing without stubbing`  
создаем конфг для тестов `shared\configs\routes\i18n\i18nForTests\index.ts`  
для удобства использования этого конфига создаем хелпер который в будущем можно будет использовать во всех тестах `shared\helpers\tests\renderWithTranslation\index.tsx`  
создаем функцию и оборачиваем по примеру из доки теста с использованием этой конфигурации `<I18nextProvider i18n={i18n}>{component}</I18nextProvider>`  
осталось использовать эту функцию для рендера компонента в `langSwitherButton.test.tsx` (пример: 10 строчка)

тест на сворачивание и разворачивание компонента `<SideBar/>`:  
у нас применяется динамический нейминг классов за счет обновления состояния sideBar  
класс `collapsed` динамически добавляется через `setState`, но тест не ждёт обновления состояния  
кроме того, используемый класс — `src-app-components-widgets-sideBar-index-module__collapsed--hash`, так как в проекте используются CSS-модули (`identity-obj-proxy`: Заменяет хэшированные классы на читаемые в тестах)

1. добавим поддержку CSS-модулей в тестах (в `jest.config.ts` настроим `moduleNameMapper:{"\\.module\\.scss$": "identity-obj-proxy"}` чтобы маппить CSS-модули на простые объекты) это позволит в тестах использовать оригинальные имена классов, такие как `collapsed`
2. в компоненте используется `setTimeout` для обновления состояния. (`jest.useFakeTimers` чтобы дождаться изменений) (а так же использовать `waitFor` для ожидания изменения класса)

---

25 Настраиваем Storybook. Декораторы. Стори кейсы на компоненты
branch:  
storyBook/decorators/storyCases-on-components

лезем в доку `https://storybook.js.org/blog/storybook-for-webpack-5/`  
For a fresh Storybook install: `npx sb init --builder webpack5`  
в корне проекта появляется папка `.storybook`  
(убираем точку, переносим ее в папук `config` где лежит webpack, в файлe `main.ts` меняем путь, на выход на 1 дирректорию `stories: ["../../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"]` )  
меняем команды для запусков скриптов дописываем путь `"storybook": "storybook dev -p 6006 -c ./config/storybook",`  
Tеперь напишем первую сторис, но уже для своего компонента: `src\app\components\shared\ui\button\button.stories.tsx`  
копируем из примера `src\stories\Button.stories.ts` код и переносим к себе  
теперь папку с примерами `src\stories` можно удалить  
при первом запуске сталкивамся с проблемой абсолютных импортов:

1. `https://storybook.js.org/docs/6/builders/webpack`  
   По умолчанию `Storybook` обеспечивает поддержку нулевой конфигурации для Webpack и автоматически настраивает базовую конфигурацию, созданную для работы с наиболее распространенными вариантами использования - мы можем расширять ее (например, `.storybook/main.ts`) и переопределять под свои нужды  
   Для переопределения `storybook-webpack.config` выберем следующий способ:  
   создаем `корень\config\storybook\webpack.config.ts`  
   создаем и экспортруем функцию которая будет перезаписывать наш storybook-webpack.config  
   1.1. в контексте абсолютгых путей нам необходимо изменить в исходном `storybook-webpack.config` `resolve` в котором нужно переопределить `extension` и `modules`  
   пример в `config\storybook\webpack.config.ts`  
   1.2. теперь настроим имопрт SCSS-модулей для `storybook-webpack.config`, по умолчанию он с ними работать не умеет  
   за основу возьмем `cssLoader` ранее использующийся в основном webpack.config
   ```
   сделал мини рефакторинг:
   вынес лоудеры в отдельную функуию (getLoader),
   чтобы использовать лоудеры как в основном вэбпак конфиге проекта,
   так и в массив `rules` в `storybook-webpack.config`
   ```
   1.3. Строрибуку не нравится отсутствующий импорт реакта(который не актуален с `React 17 версии`), здесь нам подойдут `presets` бабеля которые ранее не помогали для Jest
   раскомитил присеты: `preset-typescript, [preset-react",{"runtime":"automatic"}]` в `babel.config.json` и в самом `babelLoader`, запушил `babelLoader` в массив rules `storybook-webpack.config`

```
Настала ебала
storybook посылает нахуй глобальные scss переменные
я прообовал и лоудеры менять и импортировать ввезде их где только можно
итог один - хуй тебе а не использование глобальных переменных
в инете нет нормального решения этой хуйни,
выход только один - последовать примеру storybook и послать scss нахуй!
ну а ничего с ними не сделаешь кроме как держать в роли заметки,
и подглядывать объявляя в модуле их значения из заметки

я хуй его знает как, но помогло импортировать декоратор с темами
непосредсвенно в саму сторю причем не важно где будет импорт стилей,
в сторе или в декораторе
для перфоманса оставлю импорт стилей в декораторе
Ключевое - preview.tsx вообще бесполезный,
ни декоратор, ни стили туда импортировать не надо!
(почти каждое решение я находил именно с импортом в preview.tsx)
я ебал... у меня ушло много времени на это /Storybook 8.4.6/
коммитимся
```

по аналогии созадаем сторю на компонент `<SideBar/>`  
в `<SideBar/>` у нас есть `svg`, а у сторибука свой лоудер на обработку `svg`  
нам необходимо его отключить через все тот же `storybook-webpack.config` и соответственно добавить наш `svgLoader` в `storybook-webpack.config`

делаем `<NavBar/>`  
мы используем внутри навбара ссылки, а компонент рендерится в `storybook` изолированно  
и для того, чтобы использовать функциональность `react router dom` необходимо все обернуть в `router`  
для этого создаем декоратор

в случае с ссылками (компонент `<AppLink/>`) нам необходимо указать обязательный пропс `to`
можем передать его всем сразу `args: { to: "/" },` ну и `RourerDecorator` соответственно

---

26 Скриншотные тесты. Loki. Регрессионное UI тестирование  
branch:  
ScreenTests/Loki/RegressionUITesting

устанавливаем либу `npm install --save-dev loki`  
выполняем команду `npx loki init --config ./config/storybook` закинем в скрипт `npm run test:ui`  
добавилась инфа в `package.json` можно запускать через `Docker`, а можно через эмулятор Chorome и браузера телефона iphone 7  
теперь запускаем сторибук и выполняем команду `npx loki test`  
после прогона теста появится в корне папка `.loki` где будут лежать скриншоты  
в случае изменений в проекте можно запустить прогон регрессионных тестов и увидеть изменения которые произошли  
так же для подтверждения изменений добавим команду `npm run test:ui:ok`

---

27 CI pipeline. Автоматизация прогона тестов  
branch:  
CI-pipeline/automatick-tests-running

создаем `yml` файлик в `.github\workflows\linting-testing-building.yml`  
наполняем его согласно документации `https://docs.github.com/ru/actions/writing-workflows/quickstart`  
так как у нас есть `BundleAnalyzerPlugin`, то его необходимо отколючить при продакшен сборке. тоже самое с `HotModuleReplacementPlugin`, `ReactRefreshWebpackPlugin` и всеми плагинами для dev разработки  
лоудеры не импортируются, не знаю в чем проблема, локально все работает, при пайплайне не находит модуль (решил проблему добавив в `tscofig.json` сойство `"include": ["./config/build/loaders/index.ts"]`)

теперь запустим `loki` в `CI pipeline`  
делаем сборку сторибука  
результат сборки (`storybook-static`) добавим в `.gitignore`  
указываем при запуске `loki` путь до `storybook-static`  
`"test:ui:ci":"npx loki --requireReference --reactUri file:./storybook-static",`  
добавляем эти скрипты в `yaml`

```
скриншотные тесты не запускаются в пайплайне,
пока закоментил их, не хочу тратить время,
займусь ими при подключении `Docker`
```

---

28 SideBar. Состояния кнопки. UI Screenshot test report  
branch:  
sidebar-refactor/UI-screenshots-test-report

добавил визуальную кнопку для сайдбара  
расширил тип кнопки, теперь у нее есть размеры, тип формы (квадрат) - добавил в сторибук  
перенсим наши `<AppLink/>` из `<NavBar/>` в `<SideBar/>`:  
добавляем icons к `<AppLink/>`  
для прогонв тестов `<AppLink/>` в `<SideBar/>` необходимо указать компонент обертку для роутинга (компонент `shared\configs\tests\componentRender\index.tsx` ) (`MemoryRouter`)  
Ошибка: `TextEncoder is not defined` вызвана отсутствием глобального определения `TextEncoder` и `TextDecoder` в тестовой среде (`Node.js`). Эта проблема возникает из-за использования `react-router-dom` и/или других библиотек, которые зависят от этих объектов.  
нужно дописать импорты в `setupTests.ts`, в `jest.config.ts` допонить `setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"]` чтобы `setupTests.ts` был подключён через конфигурацию  
Полифилл `util` может потребоваться, если он ещё не установлен `npm install util --save-dev`

```
пробую починить скринщотные тесты, установлю их по новой
есть проблема. что Chrome который использует локи не успевает
за 10 секунд заскринить некоторые компоненты:

 FAIL  chrome.app/chrome.laptop/Pages/CounterPage
       Light Theme Counter Page
       Timeout after 10000ms
       Dark Theme Counter Page
       Timeout after 10000ms
 PASS  chrome.app/chrome.laptop/Pages/TranslatorPage

здесь 2 страницы, одна из них не успела обработаться.

`node_modules\@loki\browser\src\await-selector-present.js`
нашел где устанавливается значение попробую поиграться с этим
c 45000 страницы грузятся (ага бля, конечно, загрузились только 1 раз)
```

сделал скрипт `scripts\updateLokiTimeout.ts` который перезапишет значение таймаута в `node_modules` `loki` при старте  
скачал пакет `ts-node` для выполнения этого скрипта, так как обыяная `node.js` только с `js` работает  
скачал SWC лоудер так как при билде сторибука в пайплайне орет на него  
не помогло, а локально с вписаным руками лоудером сторибук не запуускается  
в общем в очередной раз откладываю и билд сторибука и прогон тестов по скриншотам.

```
в дальнейшем скачаю `"@swc/core": "1.2.122"` и `"swc-loader": "0.1.15"`
без галки перед версией
помещу их в `package.json` в `overrides`:

"overrides": {
      "@swc/core": "1.2.122",
      "swc-loader": "0.1.15"
   }

```

для асинхронных прогонов пайплайнов прописываем `if: always()`  
тоже не заметил, чтобы они отрабатывали асинхронно, но оставлю

Frontend for Loki - `https://github.com/oblador/loki/issues/308 ` 30 минута в видосе

---

29 Модальное окно. Portal  
branch:  
portal/modalWindow

при работе с модальным окном должно быть 3 составляющие: `сама обертка модалки`, `overlay` и `content`  
по нажатию на `overlay` применяем закрытие модалки, однако когда нажимаем на `content`, события всплывают и так же нажимается `overlay`  
чтобы это предотвратить используем `e.stopPropogation()`  
при открытии можно поставить анимацию полавного развертывания через CSS, однако на закрытие так сделать не получится.  
Выход следующий:  
по таймауту добавлять нужные стили, чтобы была анимация  
Необходимо сделать состояние: `const [isClosing, setIsClosing] = useState(false)` и нужен референс в котором будем хранить таймаут: `const timerRef = useRef<ReturnType<typeof setTimeout>>()` в момент когда мы будем закрывать окно, мы будем вешать `setTimeout`, этот `setTimeout` будем получать в `timerRef.current = setTimeout()`  
для чтобы можно было его отчистить ретерном колбэка из useEffect. Внутри таймаута вызываем `OnClose()` который и закроет модалку.  
Теперь необходимо изменять состояние, когда нажимаем на закрытие, мы делаем `setIsClosing(true)` а потом нам надо сделать его со значением `false` но уже в `setTimeout`.  
В момент когда `IsClosing === true` мы сможем обратиться к классу и навесить на него необходимые стили и анимации.  
После закрытия сохранится последнее состояние: `IsClosing === true`, и это можно пофиксить следующим путем: `setIsClosing(false)` по завершению `setTimeout`.  
Почему таймаут лежит в ref:  
если модалка по какой-то причине демонтируется из DOM у нас может отработать `setTimeout` и мы попытаемся изменить состояние уже не существующего (удаленного) компонента и приложение упадет с ошибкой  
Все таймауты и таймеры (асинхронные операции) необходимо отчищать внутри `useEffect` с помощью `()=>` , для того чтобы отчистить таймер, есть `ClearTimeout()` и внутрь передаем сам таймер: `timerRef.current - (ClearTimeout(timerRef.current))`. При использовании такой конструкции мы отчистим таймер у Ref и приложение не упадет.

теперь сделаем закрытие модалки на кнопку: внутри `useEffect` делаем условие `if (isOpen) {window.addEventListener("keydown", onKeyDown);}`  
если модалка открыта, то тогда на `window` навешиваем `keydown` и в качестве колбэка передаем `onKeyDown` который сменит состояние на закрытое путем выхода `closeHandler()`  
При навешивани слушателя события на `window` даже при закрытия модалки, этот слушатель останется и его тоже необходимо отчистить в колбэке useEffect: `window.removeEventListener("keydown", onKeyDown)`

`onKeyDown` - стрелочная функция, и на каждый перерендер компонента эти функции создаются заново, соответственно у каждой функции новая ссылка при каждом рендере и нужно сохранять ссылку на эту функцию.  
Оборачиваем их в `useCallback`  
плагин `npm i eslint-plugin-react-hooks --save-dev` для мемоизации подсказывает когда функцию надо мемоизировать.  
в моем случае надо будет не забыть его подключить когда откачу eslint на более раннюю версию

`ReactPortal` - механизм который позволяет закинуть компонент в любое место дом дерева, принимает пропс `children` - компонент который мы будем телепортировать с помощью `ReactPortal` и пропс `element` - некий контейнер куда мы будем телепотровать чилдрена `createPortal(children, element= document.body)` - `element= document.body` чтобы телепортация происходила туда

Для всех фунуций которые мы будем передавать как пропс небходима мемоизация `useСallback`, по тому как при изменении любого пропса компонент перерисовывается

```
произвел огромный рефактор,
не оставляю надежды починить скриншотные тесты и билд сторибука
лоудеры починились
(возможно из за строки в тс конфиге: "./config/build/loaders/index.ts")
Пизда, починил ci сторибука принудительно поставив старые версии
и убрал галки перед версиями пакетов
`"overrides": { "@swc/core": "1.2.122", "swc-loader": "0.1.15" },`
вобщем со скриншотами пока оставлю, не супер важно,
как дойду до докера, так вернусь к ним
```

---

30 Redux-toolkit. Entity. Тесты на всех уровнях  
branch:  
ReduxToolKit

`npm install @reduxjs/toolkit react-redux @types/react-redux`  
чтобы `redux` работал, нужно все приложение обернуть в провайдер: `<storeProvider/>`  
провайдер: `src\app\providers\redux\storeProvider\index.tsx`  
так же необходима дерриктория с глобальным `store` где будем конфигурировать сам `redux`: `app\providers\redux\storeProvider\store`  
в документации предагается сделать `store` и экспортировать его, у нас же в случае с тестированием такой подход не подойдет, по этому делаем функцию обертку: `createReduxStore`, и внутри нее инициализируем сам `store`, теперь мы можем переиспользовать `store` для тестирования и для React. Cоздаем `store` и передаем его как пропс в сам провайдер: `<Provider store={store}>`  
`Store` принимает 3 джинерика, `для стэйта`, `экшенов`, `мидлвар`  
при работе с `state` нам необходимо иметь представление о `типах стэйтов` и по этому создаем: `redux\storeProvider\store\stateSchema\index.ts` - `stateSchema` для того чтобы вносить туда информацию какие `states` вообще есть и из чего состоит конкретный `state`, а так же `stateSchema` будет тем типом который будет включать всебя все имеющиеся `states`  
Все `states` лежат в `reducer`.  
так же для тестов нам необходимо инициализировать `store`, чтобы для теста подготовить нужные данные, их будем передавать аргументом в `createReduxStore(initialState)` и уже в `store` инициализируем как `preloadedState: initialState`. В самом `<storeProvider/> || <Provider store={store}>` при этом `const store = createReduxStore(initialState)` то есть с аргументом `initialState`  
остается обернуть все приложение в `<storeProvider/>`, делаем это на уровне компонента `root` класса  
так же в `Chrome` есть расширение для девтулзов `redux-devtools`, но у меня не работает (починилось позже)  
зачастую все сущности использующие работу с состояниями (носят бизнесовый характер) лежат в `entity` слое по этому определяем их туда  
для создании сущности декомпозируем ее на `model` - где будет логика и собственно на сам `UI`  
в `UI` у нас будет разметка и хендлеры для изменения состояний  
в `model` у нас будут `selectors` и `slice`

`slice` - описывает логику изменения состояния, все доступные варианты как можно состояние изменить, выполняет он это в `ruducer` который необхожимо экспортировать и добавить в `createReduxStore` в поле `reducer: { counter: counterReducer }`, чтобы стор знал с чем он может взаимодействовать (касается синхронных `reducers`)

в `selectors` декомпозируем на получение:

1. всех `selectors` (всего `state`) где `state: StateSchema`
2. на каждый `selector` отдельно, в нашем случае `value`: `getCounterValue = createSelector(getCounter,(counter)>counter.value)` c помощью `createSelector` (из библиотеки `reselect`(встроена в `tool-kit`) - позволяет переиспользовать другие `selectors` которые уже есть (мемоизирует значения))  
   В тестах используется `DeepPartial<StateSchema>` где `DeepPartial` берет одно значение из типа `StateSchema`  
   для тестов в `createReduxStore` не работает абсолютный импорт,  
   решение: прописать в `jest.config.ts`: `moduleNameMapper: {"^entities/(.*)$": "<rootDir>/src/entities/$1"}`

---

31 Исправляем глобальные стили для Modal  
branch:  
modalStelesFixed

как вариант навесить тему через `document` сразу на `body`

---

31.1 Json server. Имитация бэкенда  
branch:  
jsonServer

`npm install json-server`  
потом создаем бд: `jsonServer\db.json`  
для запуска: `npx json-server --watch ./json-server/db.json --port 8000`  
создал моковый `express` с проверкой на авторизацию  
а так же обновил версию `json-server`, так как тянулась бета котороя не позволяла стартвнуть сервер  
добавил модуль в декларацию типов:

```
declare module "json-server" {
   const jsonServer: any;
   export default jsonServer;
}
```

и вписал путь в `tsconfig.json`: `"include": ["./json-server/**/*.ts" ]`

---

32 Кастомный Input. Окно авторизации. Lazy modal  
branch:  
customInput/autorizationForm

создаем новую сущность user прописываем ему `slice` и `type`, подключаем к `rooReducer`, добавляем в `user` в `StateSchema`  
далее создаем фичу `src\features\user\authByUsername` там разделяем на логику (`model`) и `UI`  
в `UI` : создаем `<LoginForm/>` и `<LoginModal/>`  
в свою очередь в `<LoginForm/>` будем испольщовать кастомный `<Input/>`, создаем его в `shared` слое  
когда ставим физически каретку в input с помощью `ref.current?.focus()` в useEffect фокус уходит при открытии модалки  
поскольку мы монтируем модалку в самом начале, и когда мы ее открываем, то фокус из input пропадает, для не потери фокуса необходимо реализовать ленивый рендер модалки:  
переходим в саму модалку в `shared` слое и дописывае новый пропс `lazy`, состояние монтирования, и useEffect который будет управлять монтированием  
при не открытом состоянии будем возвращать null  
потом будем использовать обертку по аналогии с страницами `<LoginFormLazy/>`

---

33 Husky. Pre commit хуки  
branch:  
husky
устанавливаем конфиг `npx husky-init`  
далее вписываем команды которые нужно выполнить

чаще всего используются для простых проверок, таких как прогон по линтерам  
тесты и билды скорее лучше уже вклюяать в CI

---

34 Авторизация. Reducers, slices, async thunk. Custom text  
branch:  
auth/asyncThunk

создаем `loginSchema` которая будет отвечать за состояние авторизации  
создаем `loginSlise` гле в `reducers` сможем хранить `actions` которыми сможем воспользоваться через `dispatch` чтобы установить необходимое значение `state`  
чтобы избежать лишних перерисовок `<LoginForm/>` оборачиваем его в `React.memo`. Для инпутов (пропса onChange) можем использовать обычный `dispatch` с `actions` которые не асинхронные, опять же, при передачи функции пропсом в дочерний компонент важно необходимо ее обернуть в `useCallback`.  
для того чтобы получать значения из инпутов нам необходимо создать `selector`: `getloginState`, откуда мы сможем получить данные о `user` (`username` и `password`) это нужно для пропса `value` в инпутах  
инициализируем нашу `<LoginForm/>` в глобальной `SateSchema`, заодно передаем ее в `rootReducers` глобального `store`  
все `selectors` необходимо разбтвать для мельчайших полей, `отдельный для name`, `отдельный для password`, `отдельный для isLoading`, `отдельный для error`  
Реализация логина по нажатию кнопки:  
вешаем `onClick` на кнопку, создаем хендлер, который будет вызывать `dispatch` для передачи в асинхронный `thunk` значений для авторизации (`username`, `password`)  
теперь создаем сам `thunk`: `loginByUsername`, для подтверждения корректности данных нам нужно сделать запрос на сервер, делать буде с помощью `npm i axios`  
тип `createAsyncThunk` имеет несколько аргументов

```
loginByUsername:createAsyncThunk<
   // Тип данных, которые возвращает thunk
   User,
   // Тип аргументов для thunk
   LoginByUsernameProps,
   // Типизация thunkAPI (состояние, dispatch, rejectValue)
   ThunkConfig<string>
```

с помощью `rejectWithValue` мы сможем обработать ошибки в сучае их получения

для работы с полученными async данными нам в `slice` потребуется `extraReducers`:  
где у нас по дефолту асинхронность даст нам 3 состояния `pending,` `fullfield,` `rejected` с которыми мы должны взаимодействовать через `actions.payload` и устанавливать (обработать) значения для всех 3х состояний  
вызываем в хендлере компонента `dispatch` для `thunk`: `dispatch(loginByUsername({ username, password }))`

```
столкнулся с ошибкой линтера: oбычный `useDispatch()`
не умет работать с асинхронными экшенами,
для него необходимо указывать тип
во время объявления хука: `useDispatch<AppDispatch>()`.
Документация предложила сделать кастомный
 универсальный хук: `useAppDispatch`,
который будет являться оберткой
`useDispatch<AppDispatch>()` (диспача с типом),
тут же не отхoдя от кассы проделал тоже самое с `useAppSelector()`
```

теперь можем совершать запросы:  
во время запросов хорощо было бы обработать состояние `pending` на этот случай у нас есть селектор `isLoading`, задаем ему необходимые значения в `slice`: `loginByUsername.pending`,  
так же в компоненте вешаем проверку на наличие `true` значения `isLoading` и в случае когда значение трушное, дизэйблим кнопку отправки с помощью пропса `disabled`  
так же при получении ошибки будем выводить значение которое установили в `catch` санка: `loginByUsername` и обработали в `slice`: `loginByUsername.rejected`  
для вывода сообщения об ошибке хорошо было бы стилизовать его, для этого будем создавать еще 1 компонент `UI kit` такой как `<Text/>`, который будет принимать тип `title` или `text` и стилистику `primary` или `error`  
Данные которые мы получаем с сервера необходимо сохранять в `state` и по наличию этих данных будем опрелять авторизован пользователь или нет  
в `Thunk`: `loginByUsername` полученные данные будем записывать(за отсутствием бэкенда) в `localstorage`: `localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data))`
и тут же сразу будем пердвать значение в `User/slice`в `reducer`: `thunkAPI.dispatch(userActions.setAuthData(response.data))`  
в `entity/user` в `slice` в `reducer` добавляем экшены: `setAuthData`, `initAuthData` и `logout`  
где в `setAuthData` устанавливаем значение user как авторизованного (имея данные о нем)  
на случай если пользователь закрыл вкладку мы на уровне компонента `<App/>` будем тянуть значение с `lockalStorage` и инициализировать юзера с данными с помощью `action`: `initAuthData`  
ну и остается разлогиниться, в `<NavBar/>` сделаем условие для отображения компонента кнопки на вход и на выход, флагом для этого будут значения селектора `authData` которое мы получим из `const authData = useAppSelector(getUserAuthData)`(если данные есть, показываем кнопку выхода, если данных нет - вход)  
по нажатию на кнопку выхода, запускаем хендлер который содержит `dispatch` с `action`: `logout`, который в свою очередь удалит данные из `lockalstorage` и установит `state.authData = undefined`

осталось добавить компоненты в `StoryBook`, для этого нужно сделать декоратор который будет оборачивать `<StoryComponent/>` в `<StoreProvider/>`, чтобы подружить систему хранения стора `redux` с `StoryBook`  
так же у нас используется глобальная переменная `__IS_DEV__`, `StoryBook` про нее ничего не знает, но это исправляется добавлением `definePlugin` в `storybook-webpack.config`

---

35 Оптимизация. Асинхронные редюсеры. Размер бандла
branch:
optimization/asyncRedusers/bundleSize

для перфоманса в отдельные чанки можно выносить как страницы так и модалки  
(но было бы неплохо еще выносить логику асинхронных `reducers` (`extraReducers`) в отдельный чанк для оптимизации)

для оптимизации бандла сперва вытащим `bundlAnalazerPlugin` из условия `__IS_DEV__` и запустим сборку в прод режиме (`http://127.0.0.1:8888`)  
запоминаем значения.  
`bundle.d7e587f7e393ab45ef5a.js (105.88 KB) - Gzipped`,  
`bundle.d7e587f7e393ab45ef5a.js (329.81 KB) - Parsed`  
пробуем сделать форму авторизации асинхронной  
разница не значительная - теперь  
`bundle.4e3d9769e68cda860ff8.js (105.37 KB) - Gzipped`,  
`bundle.4e3d9769e68cda860ff8.js (328.78 KB) - Parsed`

мы сделали сам компонент асинхронным, но `reducers` все равно выходят наружу, тем самым `slice` со всеми `actons`, самим `reducer` тоже уходит в главный бандл по тому что иы подключаем этот `reducer` к `rootReduсer` в глобальный `store` редакса ( тоесть сам компонент изолирован, но основная часть логики кода которая находится в `reducer` и `async thuk` остается в основном бандле)  
из `src\features\user\authByUsername\model\slice\index.ts` мы экспортруем `export const { reducer: loginReducer } = loginSlice;` и подключаем его в `src\app\providers\redux\storeProvider\config\store\index.ts` (все что лежит в `storeProvider` подтягивается в основной бандл)  
для выноса логики в чанк нужно обращаться к документации `redux code splitting`: `https://redux.js.org/usage/code-splitting`, там есть 2 подхода

1. использовать на глобальном `store`: `store.replaceReducer()` которая позволяет полностью целиком заменит `reducer`:

```
// Create an inject reducer function
  // Эта функция добавляет асинхронный reducer
  // и создает новый комбинированный reducer.
  store.injectReducer = (key, asyncReducer) => {
  store.asyncReducers[key] = asyncReducer
  store.replaceReducer(createReducer(store.asyncReducers))
  // c помощью функции replaceReducer обновляем полностью reducer
  // и добавляем новый асинхронный reducer по ключу.
 }
```

2. использование `Reducer Manager` - c помощью него `reduсers` можно добавлять, удалять, получать - это более гибкий подход, более продвинутый функциональный инструмент

Будем использовать его:  
создаем диру `src\app\providers\redux\storeProvider\config\reducerManager` и тянем туда пример с доки  
добавляем тип `StateSchemaKey` и прописываем типы для аргументов `reduce`, `add`, `remove`  
создаем `reducerManager` в главном `store`, в типе `StateSchema` делаем асинхронные редьюсеры опциональными, в `rootReducer` в `store` удаляем все асинхронные редьюсеры и вписываем ихкак `asyncReducers?: ReducersMapObject<StateSchema>` `...asyncReducers`  
в самом `store` переопределяем редьюсеры под `reducer: reducerManager.reduce,`  
теперь самому `store` необходимо добавить `reducerManager:` `store.reducerManager = reducerManager;` тип для `store` потом расширим и под тип с новым свойством  
создадим компонент обертку для асинхронной подгрузки `reducer` - `<DynamicModuleLoaderWrapper/>` который будет получать `redux store` из `const store = useStore() as ReduxStoreReducerManager` где`ReduxStoreReducerManager` тип `store` в которм есть свойство `reducerManager`: `store.reducerManager`, так что предварительно его нужно создать, путем наследования от `EnhancedStore`(который является стандартный тип `store` redux) в котором будет лежать только свойство `reducerManager` которое будет иметь тип `ReducerManager` который мы объявили при создании`function createReducerManager`  
далее в компоненте обертке `<DynamicModuleLoaderWrapper/>` прописывем useEffect где в момент монтирования компонента добавляем редьюсер с помощью `reducerManager`: `storereducerManager.add(keyname, reducer)` и в моменте размонтирования компонента в колбэке ретерна будем удалять `reducer`: `store.reducerManager.remove(keyname)` при условии которое мыуказали в пропсе `removeAfterUnmount`, так как иногда требуется оставить `reducer`, чтобы при повторном открытии использовался уже ранее созданный редьюсер  
теперь редьюсер мы можем подключить только через ленивый компонент(будет подгружаться только с самим компонентом), а не как по стандартной процедуре из `slice` в `store` и из `store`в компонент  
далее в ленивом компоненте `<LoginForm/>` наш стэйт будет пустым при монтировании и все поля в нем будут undefined, решим это путем создания 'selectors' для какждого поляиндивидуально, где укажем значения которые они будут иметь в момент когда state еще не проинициализировался, чтобы они были не undefined ( на примере `const getLoginUsername(state:StateSchema)=>state?.loginForm?.username || ""`)  
достаем значения, где под каждое поле стэйта будем вызывать соответствующий ему селектор (на примере `const username = useAppSelector(getLoginUsername)`)  
оборачиваем разметку в нашем ленивом компоненте `<LoginForm/>` в компонент обертку: `<DynamicModuleLoaderWrapper/>`  
чтобы отслежживать когда `reduсers` у нас инициализируются можно диспачить рандомный экшен и указать ему в типе строку с `${keyname}` (на примере `dispatch({ type: `@INIT ${keyname}reducer` });`)  
так же поскольку ленивый компонент `<LoginForm/>` у нас в модалке а модалка в портале, она остается в дом дереве, необходимо поместить флаг на `<LoginModal/>` при котором она будетотображаться в DOM а в ином случае удаляться и DOM  
после добавления асинхронного редьюсера - теперь  
`bundle.6e6f0ed299d411463e34.js (92.08 KB) - Gzipped`,  
`bundle.6e6f0ed299d411463e34.js (293.05 KB) - Parsed`  
для подключения нескольких редьюсеров реализуем тип `ReducersList` где будем принимать массив этих редьюсеров, далее в самом useEffect пропишем `Object.entries(reducers).forEac(([keyname, reducer]: ReducersListEntry) => {})`

так же после внедрения `asyncReducers` необходимо изменить (`createReduxStore` в `StoreProvider/ui`) для сторибука: добавим `asyncReducers` в `StoreProviderProps`, диструктурируем`asyncReducers` пропс, в `createReduxStore` добавим вторым аргументом `asyncReducers`, ранее в глобальном сторе мы уже удалили все асинхронные редьюсеры из корневого редьюсера итеперь вписываем их как (аргумент `asyncReducers?: ReducersMapObject<StateSchema>`) `...asyncReducers`  
далее в `StoreDecorator` создадим объект который будет принимать наши `defaultAsyncReducers = {loginForm:loginReducer}` ну и этот объект передаем в стор провайдер, так же вторымаргументом можем принимать остальные `asyncReducers` опционально, и разворачивать их вместе после `{{...defaultAsyncReducers, ...asyncReducers}}`

не забываем вернуть `bundlAnalazerPlugin` в условие `__IS_DEV__` чтобы не заводился в сборке в прод режиме

---

36 Тестирование фичи authByUsername. TestAsyncThunk  
branch:  
test-authByUserName/test-asyncThunk

наапишем тесты для функционала который составили ранее  
начнем с селекторов `getLoginError`, `getLoginIsLodading`, `getLoginUsername`, `getLoginPassword`  
так же для самого стэйта `getLoginState` - они легкие, делаются однотипно друг другу

тесты на `Thunk` особенно важны:  
`loginByUsername.test` - разберем подробнее
в `thunk`: `loginByUsername` у нас используется `axios` и любые запросы на сервер в тестах необходимо мокать
для мока воспользуемся функцией которую предоставляет `jest`: `jest.mock("axios");` в аргумент передаем модуль который хотим замокать  
`jest` для замоканных модулей добавляет функции по типу `mockReturnValue`: `mockedAxios.post.mockReturnValue()` которые позволяют замокать возвращаемое значение, но у нас TypeScript - он не подхватывает эти функции  
решение: `const mockedAxios: jest.MockedFunctionDeep<AxiosStatic> = jest.mocked(axios, {shallow: false,});` здесь 1 аргумент - модуль который хотим замокать, 2 аргумент - флаг с поверхностным моком, таким образом мокаем не только сам модуль, но и внутренние поля такие как `mockedAxios.post`  
в `axios` по дефолту приходит поле `data` в котором уже хранится ответ от сервера.  
таким образом мы замокали ответ от сервера.  
`CreateAsyncThunk` - это `actionCreator` который по итогу после вызова возвращает `action`, этот `action` попадает в `dispatch` и мы возвращаем какието данные.  
`loginByUsername`- это функция `CreateAsyncThunk` она создает асинхронный `thunk` еоторая будет `action`. Далее мы это `action` вызываем и помещаем в `result` результат

```
// пример результата action
{
   type: 'login/loginByUsername/fulfilled',
   payload: {username:'123', id:'1'},
   meta:{
      arg: { username:'123', password:'123'},
      requestId: 'uzu8PIqn1lwaKhakHTo0B9',
      requestStatus: 'fulfilled'
   }
}
```

как отрабатывают `dispatch`:  
один раз `dispatch` отрабатывает когда мы вызвали `loginByUsername`- это функция `CreateAsyncThunk`,  
второй раз `dispatch` вызывается когда мы применяем определенный `action` которым владет `reduser`,  
и 3 вызов `dispatch` происходит когда наступает состояние `fulfilled` - то есть при успешном выполнении `action` все дефолтные тесты для `AsyncThunk` будут повторяться, по этому хорошим патерном будет переиспользовать этот код  
создадим `src\shared\configs\tests\testAsyncThunk\index.ts` и вынесем его туда - это будет `testAsyncThunk` класс внитри которого мы всю логику изолируем

остается написать тест на `slice`
тесты на изменения состояний полей `isLoding` и `error` - избыточны, но для опыта и образца можно прописать

---

37 Страница профиля. Оптимизация перерисовок. Учимся использовать memo  
branch:  
userProfile/reRenderOptimization/ReactMemo

Здесь речь пойдет о явном закрытии модалки авторизации, а не скрытие ее по условию  
И по хорошему, когда происходит момент авторизации, делать проверку и при успешном ее выполнении закрывать модалку  
На меня ранее ругался линтер за использования `dispatch` без указания типа, поэтому я уже предварительно создал кастомный хук `useAppDispath` для работы с асинхронными экшенами  
то есть он принимает функцию преобразователя: `PayloadAction`, запускает ее и возвращает все, что возвращает сам преобразователь - `PayloadAction`.

```
useAppDispatch(loginByUsername({ username, password })):
<Promise<PayloadAction<User, string, {
    arg: LoginByUsernameProps;
    requestId: string;
    requestStatus: "fulfilled";
}, never>
```

благодаря нему TypeScript подсказывает все поля результата экшена: `PayloadAction`, возвращаемого `createAsyncThunk`.  
Этот результат представляет собой объект типа `PayloadAction` или `RejectedAction`, который содержит данные о выполнении асинхронного экшена  
Так вот проверка лежит в поле `PayloadAction.meta.requestStatus==="fulfilled"`  
сам же `PayloadAction` мы получили ранее в результате выполнения диспача `useAppDispatch(loginByUsername({ username, password }))`  
В нашем случае если `PayloadAction.meta.requestStatus==="fulfilled"` то есть завергился успешно, то необходимо закрывать модалку с формой авторизации  
Для этого сделаес следующее:  
-расширим тип `LoginFormProps` добавим пропс `onSuccess` который будет обычной функцией  
-ну и эту функцию `onSuccess` будем вызывать в случае успешной авторизации  
так же нужно в компоненте `<LoginModal/>` передать сам пропс в компонент `<LoginForm onSuccess={onClose} />`  
не забываем в сторисах сторибука указать новый аргумент `onSuccess` который веренет колбэк

теперь подходим к созданию новой сущности - странице профиля  
в `src/pages` создаем структуру для новой страницы `profilePage`  
добавляем ее в `src\pages\react-lazy\index.tsx` для асинхронной подгрузки по аналогии с остальными страницами  
добавляем новый `route` в `src\shared\configs\routes\index.tsx` и проверяем стартуя проект с новым роутом `http://localhost:3000/profile`  
теперь добавим ссылку:`<AppLink/>` в `<Sidebar/>`  
ранее я уже создал `<SidebarHeader/>` где прописывал `<AppLink/>` компоненты  
теперь вынесем `<AppLink/>` компоненты в `<Sidebaritems/>` чтобы потом их мапить в `<Sidebaritems/>` и выносить в общий компонент `<Sidebar/>`

reactMemo - для того чтобы дочерние компоненты не перерисовывались при изменении родительского  
в каких случаях ререндерится компонент:  
1 изменилось состояние - `state`  
2 изменился хотябы 1 пропс  
3 перерисовался родитель (этот пункт можно предотвратить мемоизацией)  
практически 90 % компонентов по хорошему бы оборачивать с мемо  
компоненты которые не стоит оборачивать в мемо это те компоненты у которых есть `{children}`  
когда мы перерисовываем наш интерфейс мы задействуем процессор и видеокарту, а мемо всего лишь тратит какое-то количество памяти  
сейчас памяти у всех дофига и забить какой то % из браузера достаточно сложно, а вот вычислительные процессорные, видеокарту по хорошему надо беречь, чтобы все работало быстро

кнопки - в кнопках чаще всего используется какая-то строка или текст в качестве `children` в таких случаях сравнивать легко и хранить дешево - в данном случае доапустимо использовать мемо

в случае же если в `children` передается древовидная структура на примере `routers` где в качестве чилдрена используются другие компоненты, то здесь уже работа непосредственно с объектами  
объекты могут менять ссылки и соответсвенно 2 по виду одинаковых объекта могут быть разными по тому что они находятся в разной области памяти
а строка это примитив который мы сравниваем не по ссылке, а по значению

для отслеживания ререндеров компонентов в `chrome` есть расширение `react dev tools`

далаее настроим логику инициализации страницы профиля  
создаем `src\entities\profile` по стандарту указываем `types`, `slice`, `selectors`  
добавляем `profileReducer` (он же `ProfileSchema`) в `StateSchema`  
в `src\pages\profilePage\index.tsx` оборачиваем компонент в `<DynamicModuleLoaderWrapper reducers={redusers}/>`
где `redusers: ReducersList ={profile: profileReducer,};` чтобы подгружать наш `profileReducer` асинхронно

так же в сторибуке на компонент `<ProfilePage/>` добавим `StoreDecorator` по тому как используем в компоненте `asyncReducers`
дополнительно провалимся в декоратор `StoreDecorator` и расширим `defaulAsyncReducers` вписав туда `profile: profileReducer`

---

38 Инстанс API. ApiUrl
branch:  
instanceAPI/ApiUrl

Улутшение асинхронных запросов на примере `src\features\authByUsername\model\services\loginByUsername\index.ts`  
Создадим `instance axios` в `src\shared\api\index.ts`  
зададим `baseURL` и `headers` чтобы при каждом запросе у нас уже была строка например `"http://localhost:8000"` в которую останется лишь добавить `/login` в самом thunk при запросе, Ну и токен который будем отсылать при каждом запросе

у `thunkApi` eсть аргумент `extra` `app\providers\redux\storeProvider\config\store\index.ts` (30 строка - указываем мидлвару так как в tool-kit есть набор мидлвар которые содержат в серебе работу с thunk) в который мы можем расположить любые вспомогательные функции, данные, и как раз в этот агумент будем помещать инстанс api: `$apiCreateBase` чтобы не импортировать его в каждый файл с `asynkThunk ом`

так же из `asynkThunk` мы можем делать редиректы (например после успещной авторизации перебрасывать пользователя на определенную страниу)  
для этого используется хук `useNavigate`, его мы тоже можем упаковать в `thunkApi.extra` по аналогии с инстанс api  
в `<StoreProvider/>` вызывем хук `useNavigate` и определим его в `navigate`, далее передаем аргументом в `store`  
в `createReduxStore` укажем ему тип `navigate?: (to: To, options?: NavigateOptions) => void` и передадим его в `thunk.extraArgument` аналогично инстанс api  
теперь при вызове `thunk` в блоке `try` можем указать редирект путем `extra.navigate('/about')`

для `thunkApi` создадим тип: `ThunkExtraArg` чтобы ts знал, что у него есть `ExtraArgs`  
в `createAsynkThunk` где аргумент принимает конфиг укажем у `extra: ThunkExtraArg`  
для простоты использования, создадим сам конфиг: `ThunkConfig<T>` куда пропишем `rejectValue` и `extra`

для определения `baseUrl` в версии prod и dev создадим еще одну глобальную переменную `__API__`  
ее мы будем задавать на этапе сборки приложения
добавим в типы `BuildOptions`, `BuildEnv`  
добавим в `DefinePluguin` новую переменную, тоже самое делаем для `storybook-webpack.config`, так же добавляем ее в `Jest.config`, прописываем ее в глобальную декларацию типов и в конфиг `eslint`
не забываем проинициализировать само значение в `webpack.config`
теперь в качестве `baseUrl` в instance api: `$apiCreateBase` передаем глобальную переменную `__API__`

для тестов использующих asynkThunk с fetch api необходимо внести изменения
так как раньше мы использовали сам axios а теперь используем экстрааргумент `src\shared\api\index.ts` `$apiCreateBase`
так что теперь вместо мока axios должны использовать мок экстрааргумента

импортируем в `src/shared/configs/tests/testAsyncThunk/index.ts` `jest.mock("axios");`
создем `const mockedAxios: jest.MockedFunctionDeep<AxiosStatic> = jest.mocked(axios, {shallow: false,});`
в классе укажим типы для `api: jest.MockedFunctionDeep<AxiosStatic>` и `navigate: jest.MockedFn<any>;`
передаем в конструктор `this.api = mockedAxios`и`this.navigate = jest.fn()` c нужными значениями
теперь вместо 3 аргумента(Extra) в action, мы передаеи `{api: this.api, navigate: this.navigate}`
если раньше мы мокади axios, то теперь мокаеи api внутри thunk `thunk.api`

---

39 Модуль профиля. Фетчинг данных. TS strict mode  
branch:  
profilesModule/dataFetching/TS-strictMode

продолжаем разработку страницы профиля
создадим `src\entities\profile\model\services\index.ts` `asyncThunk`- `fetchProfileData` в котором будем загружать данные о пользователе
теперь необходимо использовать наш `asyncThunk`- `fetchProfileData` внутри нашей страницы `src\pages\profilePage\index.tsx`  
внутри `useEffect` будем выполнять запрос `dispatch(fetchProfileData())`  
теперь запустим приложение, авторизованными перейдем на вкладку /profile и убедимся, что запрос отправляется: увидим 2 состояния pending и fulfielld  
теперь к ним необходимо добавить экшены, переходим в slice и вписываем в extraReducers наши состояния которые мы хотим обработать  
для использования данных в компоненте создадим селекторы  
сейчас мы можем для каждого поля стэйтаа вытянуть определенный селектор, но в рамках `ProfileCard` нам нужно получать все поля, по этому будем получать весь `state` целиком, а заодно и `error`, и `isLoading`

Включаем Strict режим в TS Config для проекта: добавляем `"strict": true`  
использование ts без strict mode не имеет никакого смысла, это очень полезно в опциональных полях `optionalChaning`, чтобы мы не пропускали ошибок

---

40 Чиним типы и проект после TS strict mode. ThunkConfig  
branch:  
TS-strict-mode/ThunkConfig

1. ERROR in `D:\code\myPet\config\tests\setupTest.ts`  
   // TS2322: Type 'typeof TextDecoder' is not assignable to type ...  
   решение:  
   `https://stackoverflow.com/questions/70808405/how-to-set-global-textdecoder-in-jest-for-jsdom-if-nodes-util-textdecoder-is-ty#:~:text=I%20managed%20to%20get%20rid%20of%20the%20error%20by%20first%20coercing%20the%20global%20object%20to%20any%20then%20assigning%20the%20TextDecoder%3A`

2. ERROR in `D:\code\myPet\config\storybook\webpack.config.ts`  
   // TS18048: 'config.resolve' is possibly 'undefined'.  
   // TS18048: 'config.resolve.modules' is possibly 'undefined'.  
   // TS18048: 'config.resolve.extensions' is possibly 'undefined'.  
   // TS18048: 'config.module' is possibly 'undefined'.  
   // TS18048: 'config.module.rules' is possibly 'undefined'.  
   решение:
   использование `Optional Chaining operator` `?`

3. ERROR in `D:\code\myPet\config\storybook\webpack.config.ts`  
   // TS2345: Argument of type '(rule: RuleSetRule) => webpack.RuleSetRule' is not assignable to parameter of type ...  
   решение:

   1. массив может содержать не только RuleSetRule, но и другие значения (false, "", 0, "...", null, undefined). Следовательно, нужно обработать все эти случаи в функции map
   2. yсловное присваивание массива: Если config?.module?.rules равно null или undefined, мы присваиваем пустой массив []

4. ERROR in `D:\code\myPet\src\app\providers\redux\storeProvider\config\reduserManager\index.ts`  
   // TS2322: Type '(state: StateSchema, action: UnknownAction) => { counter: CounterSchema; user: UserSchema; loginForm?: undefined; profile?: undefined; }' is not assignable to type '(state: StateSchema | undefined, action: UnknownAction) => StateSchema'.  
   решение: // @ts-ignore

5. ERROR in `D:\code\myPet\src\shared\ui\modal\index.tsx`  
   // TS2722: Cannot invoke an object which is possibly 'undefined'.  
   решение:  
   `https://dev.to/wojciechmatuszewski/mutable-and-immutable-useref-semantics-with-react-typescript-30c9#:~:text=Suppose%20we%20are%20writing%20a%20component%20that%20deals%20with%20timers.`

6. ERROR in `D:\code\myPet\src\shared\ui\modal\index.tsx`  
   TS2722: Cannot invoke an object which is possibly 'undefined'.  
   решение: связано с тем, что в интерфейсе ModalProps свойство onClose не является обязательным надо в `onClose?.()` использовать опциональный оператор перед вызовом

7. ERROR in `D:\code\myPet\src\shared\ui\modal\index.tsx`  
   TS2769: No overload matches this call.  
   решение: `clearTimeout` в браузерном окружении ожидает `number | undefined`, так как идентификатор таймера — это число. В `Node.js`, он возвращает объект типа `Timeout`, что вызывает расхождение в типах. Тип `null` также несовместим с `clearTimeout` нужно добавить проверку на наличие `timerRef.current === true` значения

8. ERROR in `D:\code\myPet\src\shared\ui\modal\index.tsx`  
   TS2345: Argument of type `Record<string, boolean | undefined>` is not assignable to parameter of type 'Mods'.  
   решение: в `D:\code\myPet\src\shared\helpers\classNames\index.ts` в тип `Mods` добавить значение `undefined`

9. ERROR in `D:\code\myPet\src\shared\ui\button\index.tsx`  
   TS2322: Type '{ [x: string]: boolean | undefined; [x: number]: true; }' is not assignable to type `Record<string, boolean>`.  
   решение: используем `Mods` тип из `D:\code\myPet\src\shared\helpers\classNames\index.ts`

10.   ERROR in `D:\code\myPet\src\app\providers\themeProvider\useTheme\index.ts`  
      TS2322: Type `ThemeStateEnums | undefined` is not assignable to type `ThemeStateEnums`.  
      решение: присвоим `ThemeStateEnums.Light` в случае когда `theme === undefined`

11.   ERROR in `D:\code\myPet\src\shared\configs\storybook\decorators\storeDecorator\index.tsx`  
      TS2322: Type `Reducer<LoginSchema>` is not assignable to type `Reducer<LoginSchema | undefined, UnknownAction, LoginSchema | undefined>`.  
      решение: использовать `type ReducersList = Partial<Record<StateSchemaKey, Reducer>>` вместо `DeepPartial<ReducersMapObject<StateSchema>>`

12.   ERROR in `D:\code\myPet\src\widgets\sideBar\sideBarHeader\index.tsx`  
      TS2322: Type 'string | undefined' is not assignable to type 'string'.  
      Используем "!" для указания, что `path` не будет `undefined`

```
// в createReducerManager столкнулся с разными версиями типов combineReducers

// этот тип старой версии  редакса
export function combineReducers<S>(
  reducers: ReducersMapObject<S, any>
): Reducer<CombinedState<S>>
export function combineReducers<S, A extends Action =
AnyAction>( reducers: ReducersMapObject<S, A>
): Reducer<CombinedState<S>, A>
export function combineReducers<M extends ReducersMapObject
<any, any>>( reducers: M): Reducer<
  CombinedState<StateFromReducersMapObject<M>>,
  ActionFromReducersMapObject<M>
>

// а этот актуальной версии  редакса
declare function combineReducers<M>(
   reducers: M
): M[keyof M] extends Reducer<any,any,any> | undefined
   ? Reducer<
        StateFromReducersMapObject<M>,
        ActionFromReducersMapObject<M>,
        Partial<PreloadedStateShapeFromReducersMapObject<M>>
     >
   : never;

```

между этими двумя версиями `combineReducers` есть важные различия. Они касаются того, как обрабатываются типы для состояния и редьюсеров, а также какой тип возвращается в результате работы функции  
Первая версия возвращает типы `CombinedState<S>` и `ActionFromReducersMapObject<M>`, что является более простым и прямолинейным способом работы с редьюсерами  
Вторая версия использует более сложную типизацию с условным типом для более точного определения возвращаемого типа. Эта версия динамически извлекает типы состояния и экшенов, а также типизирует предварительное состояние в `PreloadedStateShapeFromReducersMapObject<M>`  
Вторая версия: более сложная и гибкая, подходит для более сложных случаев, где требуется учитывать дополнительные особенности, такие как предварительно загруженное состояние и возможность `undefined` для некоторых редьюсеров

переопределил DeepPartial через глобальную деклорацию, теперь его не надо импортировать

`npm run storybook -- --debug-webpack`  
всплыли проблемы по сторибуку, декоратор `StoreDecorator` не может загрузиться та как асинхронный,  
не знаю как пофиксить предпологаю проблема в вэбпаке сторибука.  
исправил только сам билд сторибука, он запускается, но не показывает компоненты с этим декоратром

пофиксил сторибук, проблема оказалась как я и думал в конфиге сборщика  
в define plaguin неправильно былли указаны isDev и Api

```
config?.plugins?.push(
      new DefinePlugin({
         __IS_DEV__: JSON.stringify(true),
         __API__: JSON.stringify(""),
      })
   );
```

---

41 Модуль профиля. Avatar. Редактирование и сохранение. Приватные роуты
branch:
profileModule/avatar/CRUD/privateRoutes

---

-
-
-
-
-
-
-  ***

что еще сделать:
деклорация через 1 глобальную деклорацию scss модулей  
`https://www.youtube.com/watch?v=MvnTwjAjhic` - посмотреть про новый Eslint  
перетянуть eslint с старой версией без галки, и вписать в overrides по аналогии с swc-loader  
плагин `npm i eslint-plugin-react-hooks --save-dev` для мемоизации подсказывает когда функцию надо мемоизировать.  
скриншотные тесты в пайплайне (Docker)  
интернационализация, пройтись по приложению и навесить везде переводы i18n

---

для заметки:

````чтобы убрать коммиты из удаленного репозитория
Сначала синхронизируйте локальный репозиторий с удалённым
1 git fetch origin
2 git pull origin <имя ветки>
смотрим истории комитов и выбираем SHAкомита к которому нужно откатиться
3 git log
4 git reset --soft SHAкомита
создаем новый коммит
5 git add -A
6 git commit -m 'тест'
перезаписывем историю на удалённом репозитории
7 git push origin <имя ветки> --force```

при объявленом типе можем нажать alt + space для того чтобы были подсказки какие значения доступны для использования при ээтом типе

1. Добавить курсоры на нескольких строках
Windows/Linux: Alt + Click на нужных строках.
2. Вертикальный выбор (добавить курсоры на нескольких строках подряд)
Windows/Linux: Ctrl + Alt + ↑/↓ стрелка.
3. Выделить текст в нескольких строках для редактирования
Shift + Alt + стрелка вверх/вниз: Расширяет выделение вертикально.
После этого вы можете редактировать все выделенные строки одновременно.
4. Выбрать одно слово и все его вхождения
Поставьте курсор на слово и нажмите:
Windows/Linux: Ctrl + D.
Нажимайте Ctrl + D/Command + D снова для выбора следующего вхождения.
5. Выбрать все вхождения слова
Выделите слово или просто поставьте на него курсор.
Нажмите:
Windows/Linux: Ctrl + Shift + L.
6. Перейти в режим выделения блоков
Windows/Linux: Ctrl + Shift + Alt + стрелка (вверх/вниз/вправо/влево).

````
