// до установки ts писали на require
// const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const webpack = require("webpack");
// после установки ts писали на import * as
// import * as path from "path";
// import * as HtmlWebpackPlugin from "html-webpack-plugin";
// import * as webpack from "webpack";
// после добавления свойства allowSyntheticDefaultImports в tsconfig пишем обычный import
// import path from "path";
// import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
// import { buildPlugins } from "./config/build/buildPlugins";
// import { buildLoaders } from "./config/build/buildLoaders";
// import { buildResolvers } from "./config/build/buildResolvers";
import { buildWebpackConfig } from "./config/build/buildWebpackConfig";
import { BuildPath } from "./config/build/types/config";
import path from "path";

const paths: BuildPath = {
  entry: path.resolve(__dirname, "src", "index.ts"),
  build: path.resolve(__dirname, "build"),
  html: path.resolve(__dirname, "public", "index.html"),
};

const mode = "development";
const isDev = mode === "development";

const config: webpack.Configuration = buildWebpackConfig({
  mode: "development",
  paths,
  isDev,
});
// декомпозировали объект конфига в отдельную функцию
// {
//   //настройки по умолчанию для среды development
//   mode: "development",
//   entry: { bundle: path.resolve(__dirname, "src", "index.ts") }, //стартовая точка приложения
//   // настройки куда и как будем делать сборку приложения
//   output: {
//     path: path.resolve(__dirname, "build"), // папка билд, идогда именуют как dist
//     // динамический нэйминг, (обойти браузерный кэш)
//     filename: "[name].[contenthash].js", //  Name берется из entry (сейчас name=bundle)
//     clean: true, //для удаления, старых сборок
//   },
//   plugins: buildPlugins(),
//   //перенесли в config/build/buildPlugins.ts
//   // [
//   // new HtmlWebpackPlugin({
//   //   template: path.resolve(__dirname, "public", "index.html"), // берет за основу index.html из public
//   // }),
//   // new webpack.ProgressPlugin(),
//   // ]
//   module: {
//     // в rules мы конфигурируем лоадеры они предназаначены
//     //для того чтобы обрабатывать файлы за рамки js
//     rules: buildLoaders(),
//     // [
//     //   {
//     //     // в test мы указываем регулярку по которой будим находить ts, tsx файлы
//     //     test: /\.tsx?$/,
//     //     // в use указываем сам лоудер
//     //     use: "ts-loader",
//     //     // исключем node_modules
//     //     exclude: /node_modules/,
//     //   },
//     // ],
//   },
//   // в resolve указываем расширения тех файлов у которых при импорте мы
//   // не будем указывать расширения (файл с исходным кодом)
//   resolve: buildResolvers()
//   // {
//   //   extensions: [".tsx", ".ts", ".js"],
//   // },
// };
export default config;

// module.exports = {
//   //настройки по умолчанию для среды development
//   mode: "development",
//   entry: { bundle: path.resolve(__dirname, "src", "index.ts") }, //стартовая точка приложения
//   // настройки куда и как будем делать сборку приложения
//   output: {
//     path: path.resolve(__dirname, "build"), // папка билд, идогда именуют как dist
//     // динамический нэйминг, (обойти браузерный кэш)
//     filename: "[name].[contenthash].js", //  Name берется из entry (сейчас name=bundle)
//     clean: true, //для удаления, старых сборок
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: path.resolve(__dirname, "public", "index.html"), // берет за основу index.html из public
//     }),
//     new webpack.ProgressPlugin(),
//   ],
//   module: {
//     // в rules мы конфигурируем лоадеры они предназаначены
//     //для того чтобы обрабатывать файлы за рамки js
//     rules: [
//       {
//         // в test мы указываем регулярку по которой будим находить ts, tsx файлы
//         test: /\.tsx?$/,
//         // в use указываем сам лоудер
//         use: "ts-loader",
//         // исключем node_modules
//         exclude: /node_modules/,
//       },
//     ],
//   },
//   // в resolve указываем расширения тех файлов у которых при импорте мы
//   // не будем указывать расширения (файл с исходным кодом)
//   resolve: {
//     extensions: [".tsx", ".ts", ".js"],
//   },
// };
