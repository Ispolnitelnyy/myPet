import webpack from "webpack";

export function buildLoaders(): webpack.RuleSetRule[] {
  const typeLoader = [
    {
      test: /\.tsx?$/,
      use: "ts-loader",
      exclude: /node_modules/,
    },
  ];

  return typeLoader;
}
