import webpack from "webpack";
import { BuildOptions } from "./types/config";
import path from "path";
import { buildPlugins } from "./buildPlugins";
import { buildLoaders } from "./buildLoaders";
import { buildResolvers } from "./buildResolvers";

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
  const { mode, paths } = options;
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
      rules: buildLoaders(),
    },
    resolve: buildResolvers(),
  };
}
