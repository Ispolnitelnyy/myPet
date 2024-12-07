import {
   BuildOptionsStorybook,
   BuildPathStorybook,
} from "../build/types/config";
import webpack, { RuleSetRule } from "webpack";
// import { getLoader } from "../build/loaders";
import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export default ({ config }: { config: webpack.Configuration }) => {
   const paths: BuildPathStorybook = {
      src: path.resolve(__dirname, "..", "..", "src"), // путь до папки src - выходим из диры storybook и из config в корень проекта,  выбираем src
   };
   const options: BuildOptionsStorybook = {
      paths,
      isDev: true,
   };

   config.resolve.modules.push(options.paths.src); // добавляем путь  в массив modules конфига вэбпака сторибука
   config.resolve.extensions.push(".ts", ".tsx"); // добавляем расширения в массив extensions конфига вэбпака сторибука
   // config.module.rules.push(getLoader(options.isDev).cssLoader);
   // config.module.rules.push(getLoader().babelLoader);
   config.module.rules.push({
      test: /\.s[ac]ss$/i,
      use: [
         options.isDev ? "style-loader" : MiniCssExtractPlugin.loader,
         {
            loader: "css-loader",
            options: {
               modules: {
                  auto: (resPath: string) =>
                     Boolean(resPath.includes(".module.")),
                  localIdentName: options.isDev
                     ? `[path][name]__[local]--[hash:base64:5]`
                     : `[hash:base64:7]`,
               },
            },
         },
         "sass-loader",
      ],
   }); // добавляем cssLoader в массив rules конфига вэбпака сторибука
   config.module.rules.push({
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
   }); // отрубаем дефолтеый импорт реакта через правило в babelLoader и тянем его в массив rules конфига вэбпака сторибука
   config.module.rules = config.module.rules.map((rule: RuleSetRule) => {
      if (/svg/.test(rule.test as string)) {
         return { ...rule, exclude: /\.svg$/i };
      }
      return rule;
   }); // отключение дефолтного правила для svg если такое есть
   // config.module.rules.push(getLoader().svgLoader);
   config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
   }); // впмсываем лоудер svg для отображения svg в sidebar
   config.module.rules.push({
      test: /\.tsx?$/,
      use: {
         loader: "swc-loader",
         options: {
            jsc: {
               parser: {
                  syntax: "typescript",
                  tsx: true,
               },
               target: "es2015",
            },
         },
      },
   }); // впмсываем SWC лоудер так как при биде в пайплайне орет на его
   return config;
};
