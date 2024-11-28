import webpack from "webpack";
import { BuildOptions } from "./types/config";
import path from "path";
import { buildPlugins } from "./buildPlugins";
import { buildLoaders } from "./buildLoaders";
import { buildResolvers } from "./buildResolvers";
import { buildDevServer } from "./buildDevServer";

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
  const { mode, paths, isDev } = options;
  return {
    mode,
    entry: { bundle: paths.entry },
    output: {
      path: paths.build,
      filename: "[name].[contenthash].js",
      clean: true,
    },
    plugins: buildPlugins(paths),
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(),
    devtool: isDev ? "inline-source-map" : undefined,
    devServer: isDev ? buildDevServer(options) : undefined,
  };
}
