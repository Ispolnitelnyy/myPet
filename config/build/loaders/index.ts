import MiniCssExtractPlugin from "mini-css-extract-plugin";

export function getLoader(isDev?: boolean) {
   return {
      typescriptLoader: {
         test: /\.tsx?$/,
         use: "ts-loader",
         exclude: /node_modules/,
      },
      cssLoader: {
         test: /\.s[ac]ss$/i,
         use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            {
               loader: "css-loader",
               options: {
                  modules: {
                     auto: (resPath: string) =>
                        Boolean(resPath.includes(".module.")),
                     localIdentName: isDev
                        ? `[path][name]__[local]--[hash:base64:5]`
                        : `[hash:base64:7]`,
                  },
               },
            },
            "sass-loader",
         ],
      },
      fontsLoader: {
         test: /\.(woff|woff2|eot|ttf|otf)$/i,
         type: "asset/resource",
      },
      svgLoader: {
         test: /\.svg$/,
         use: ["@svgr/webpack"],
      },
      fileLoader: {
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
      },
      babelLoader: {
         test: /\.(js|ts|jsx|tsx)$/,
         exclude: /node_modules/,
         use: {
            loader: "babel-loader",
            options: {
               presets: [
                  "@babel/preset-env",
                  [
                     "@babel/preset-react",
                     {
                        runtime: "automatic", // Включает автоматический импорт React
                     },
                  ],
                  "@babel/preset-typescript", // использую аналог ts-jest
               ],
               plugins: [
                  [
                     "i18next-extract",
                     { locales: ["ru", "en"], keyAsDefaultValue: true },
                  ],
               ],
            },
         },
      },
   };
}
