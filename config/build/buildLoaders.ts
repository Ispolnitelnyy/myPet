import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";
import { BuildOptions } from "./types/config";

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
  const typescriptLoader = {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  };
  const cssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      options.isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            auto: (resPath: string) => Boolean(resPath.includes(".module.")),
            localIdentName: options.isDev
              ? `[path][name]__[local]--[hash:base64:5]`
              : `[hash:base64:7]`,
          },
        },
      },
      "sass-loader",
    ],
  };
  const fontsLoader = {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: "asset/resource",
  };
  const svgLoader = {
    test: /\.svg$/,
    use: ["@svgr/webpack"],
  };
  const fileLoader = {
    test: /\.(png|jpe?g|gif)$/i,
    type: "asset/resource",
    generator: {
      filename: "assets/images/[name][ext]",
    },
    use: [
      {
        loader: "file-loader",
      },
    ],
  };
  const babelLoader = {
    test: /\.(js|ts|jsx|tsx)$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: [
          "@babel/preset-env",
          // "@babel/preset-react", // Если используете React
          // "@babel/preset-typescript",
        ],
        plugins: [["i18next-extract", { locales: ["ru", "en"], keyAsDefaultValue: true }]],
      },
    },
  };

  return [fileLoader, svgLoader, babelLoader, fontsLoader, typescriptLoader, cssLoader];
}
