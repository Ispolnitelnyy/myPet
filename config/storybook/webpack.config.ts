import {
   BuildOptionsStorybook,
   BuildPathStorybook,
} from "../build/types/config";
import webpack from "webpack";
import { getLoader } from "../build/loaders";
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
   config.resolve.extensions.push(".ts", ".tsx"); // добавляем расширения в массив extensions конфига вэбпака сторибука
   config.module.rules.push(getLoader(options.isDev).cssLoader); // добавляем cssLoader в массив rules конфига вэбпака сторибука
   config.module.rules.push(getLoader().babelLoader); // отрубаем дефолтеый импорт реакта через правило в babelLoader и тянем его в массив rules конфига вэбпака сторибука
   return config;
};
