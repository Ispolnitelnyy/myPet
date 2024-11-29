import { AboutPageLazy, CounterPageLazy, MainPageLazy } from "app/pages/react-lazy";
import { RouteProps } from "react-router-dom";

export enum AppRoutesEnum {
  MAIN = "main",
  ABOUT = "about",
  COUNTER = "counter",
}

export const RoutePath: Record<AppRoutesEnum, string> = {
  [AppRoutesEnum.MAIN]: "/",
  [AppRoutesEnum.ABOUT]: "/about",
  [AppRoutesEnum.COUNTER]: "/counter",
};

export const routeConfig: [AppRoutesEnum, RouteProps][] = [
  [AppRoutesEnum.MAIN, { path: RoutePath.main, element: <MainPageLazy /> }],
  [AppRoutesEnum.ABOUT, { path: RoutePath.about, element: <AboutPageLazy /> }],
  [AppRoutesEnum.COUNTER, { path: RoutePath.counter, element: <CounterPageLazy /> }],
];
