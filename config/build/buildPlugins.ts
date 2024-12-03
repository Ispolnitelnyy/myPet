import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import { BuildOptions } from "./types/config";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

export function buildPlugins(
   options: BuildOptions
): webpack.WebpackPluginInstance[] {
   return [
      new HtmlWebpackPlugin({
         template: options.paths.html,
      }),
      new webpack.ProgressPlugin(),
      new MiniCssExtractPlugin({
         filename: "css/[name].[contenthash:8].css",
         chunkFilename: "css/[name].[contenthash:8].css",
      }),
      new webpack.DefinePlugin({
         __IS_DEV__: JSON.stringify(options.isDev),
      }),
      options.isDev && new webpack.HotModuleReplacementPlugin(),
      options.isDev && new ReactRefreshWebpackPlugin(),
      new BundleAnalyzerPlugin({ openAnalyzer: false }),
   ];
}
