import webpack from "webpack";

export function buildLoaders(): webpack.RuleSetRule[] {
  const typeLoader = [
    {
      // в test мы указываем регулярку по которой будим находить ts, tsx файлы
      test: /\.tsx?$/,
      // в use указываем сам лоудер
      use: "ts-loader",
      // исключем node_modules
      exclude: /node_modules/,
    },
  ];

  return typeLoader;
}
