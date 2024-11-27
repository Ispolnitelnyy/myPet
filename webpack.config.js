const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  //настройки по умолчанию для среды development
  mode: "development",
  entry: { bundle: path.resolve(__dirname, "src", "index.js") }, //стартовая точка приложения
  // настройки куда и как будем делать сборку приложения
  output: {
    path: path.resolve(__dirname, "build"), // папка билд, идогда именуют как dist
    // динамический нэйминг, (обойти браузерный кэш)
    filename: "[name].[contenthash].js", //  Name берется из entry (сейчас name=bundle)
    clean: true, //для удаления, старых сборок
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),// берет за основу index.html из public
    }),
    new webpack.ProgressPlugin(),
  ],
};
