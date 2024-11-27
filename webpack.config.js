const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  //настройки по умолчанию для среды development
  mode: "development",
  entry: { bundle: path.resolve(__dirname, "src", "index.ts") }, //стартовая точка приложения
  // настройки куда и как будем делать сборку приложения
  output: {
    path: path.resolve(__dirname, "build"), // папка билд, идогда именуют как dist
    // динамический нэйминг, (обойти браузерный кэш)
    filename: "[name].[contenthash].js", //  Name берется из entry (сейчас name=bundle)
    clean: true, //для удаления, старых сборок
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"), // берет за основу index.html из public
    }),
    new webpack.ProgressPlugin(),
  ],
  module: {
    // в rules мы конфигурируем лоадеры они предназаначены
    //для того чтобы обрабатывать файлы за рамки js
    rules: [
      {
        // в test мы указываем регулярку по которой будим находить ts, tsx файлы
        test: /\.tsx?$/,
        // в use указываем сам лоудер
        use: "ts-loader",
        // исключем node_modules
        exclude: /node_modules/,
      },
    ],
  },
  // в resolve указываем расширения тех файлов у которых при импорте мы
  // не будем указывать расширения (файл с исходным кодом)
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
