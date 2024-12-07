import {
   BuildOptionsStorybook,
   BuildPathStorybook,
} from "../build/types/config";
import webpack, { RuleSetRule } from "webpack";
import { getLoader } from "../build/loaders/index";
import path from "path";

export default ({ config }: { config: webpack.Configuration }) => {
   const paths: BuildPathStorybook = {
      src: path.resolve(__dirname, "..", "..", "src"), // путь до папки src - выходим из диры storybook и из config в корень проекта,  выбираем src
   };
   const options: BuildOptionsStorybook = {
      paths,
      isDev: true,
   };

   config.resolve.modules.push(options.paths.src); // добавляем путь  в массив modules конфига вэбпака сторибука
   config.resolve.extensions.push(".ts", ".tsx"); // добавляем расширения в массив extensions
   config.module.rules.push(getLoader(options.isDev).cssLoader); // добавляем cssLoader в массив rules
   config.module.rules.push(getLoader().babelLoader); // отрубаем дефолтеый импорт реакта через правило в babelLoader
   // отключение дефолтного правила для svg если такое есть
   config.module.rules = config.module.rules.map((rule: RuleSetRule) => {
      if (/svg/.test(rule.test as string)) {
         return { ...rule, exclude: /\.svg$/i };
      }
      return rule;
   });
   config.module.rules.push(getLoader().svgLoader); // впмсываем лоудер svg для отображения svg в sidebar

   return config;
};
