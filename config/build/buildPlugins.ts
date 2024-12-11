import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import { BuildOptions } from "./types/config";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

export function buildPlugins(
   options: BuildOptions
): webpack.WebpackPluginInstance[] {
   const plugins = [
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

      // TODO: для теста на размер бандла в прод сборке
      new BundleAnalyzerPlugin(),
   ];

   if (options.isDev) {
      plugins.push(
         new webpack.HotModuleReplacementPlugin(),
         new ReactRefreshWebpackPlugin(),
         // чтобы он не открывалчя передаем { openAnalyzer: false }
         // new BundleAnalyzerPlugin({ openAnalyzer: false })
      );
   }

   return plugins;
}
