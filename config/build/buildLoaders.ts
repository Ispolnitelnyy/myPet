import webpack from "webpack";
import { getLoader } from "./loaders";

export function buildLoaders(isDev: boolean): webpack.RuleSetRule[] {
   const {
      typescriptLoader,
      cssLoader,
      fontsLoader,
      svgLoader,
      fileLoader,
      babelLoader,
   } = getLoader(isDev);

   return [
      fileLoader,
      svgLoader,
      babelLoader,
      fontsLoader,
      typescriptLoader,
      cssLoader,
   ];
}
