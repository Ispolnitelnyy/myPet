# myPet

1. npm init -y
2. создаем src, index.js
3. [webpack.js.org](https://webpack.js.org/guides/getting-started/#basic-setup)
   3.1. npm install webpack webpack-cli --save-dev (ULBI: "webpack":"^5.96.1","webpack-cli":"^5.1.4")
   3.2. создаем webpack.config.js командой npx webpack --config webpack.config.js
   3.3 при заполненных entry и output в конфиге вэбпака, можем его запустить командой 'npx webpack'
4. задаем динамический нэйминг для бандла в конфиге (комит-3d737a95879dfbbaa3b5be1b8e2a4e16a8d58f55)
5. создаем public, index.html
6. подтягиваем плагины вэбпака (html-webpack-plugin)
7. вписываем в конфиг плагины и задаем template для HtmlWebpackPlugin
