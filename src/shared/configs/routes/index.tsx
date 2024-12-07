import NotFoundPage from "../../../pages/404Page";
import { AboutPageLazy, MainPageLazy } from "../../../pages/react-lazy";
import { RouteProps } from "react-router-dom";

export enum AppRoutesEnum {
   NOTFOUND = "notfound",
   MAIN = "main",
   ABOUT = "about",
}

export const RoutePath: Record<AppRoutesEnum, string> = {
   [AppRoutesEnum.NOTFOUND]: "/*",
   [AppRoutesEnum.MAIN]: "/",
   [AppRoutesEnum.ABOUT]: "/about",
};

export const routeConfig: [AppRoutesEnum, RouteProps][] = [
   [
      AppRoutesEnum.NOTFOUND,
      { path: RoutePath.notfound, element: <NotFoundPage /> },
   ],
   [AppRoutesEnum.MAIN, { path: RoutePath.main, element: <MainPageLazy /> }],
   [AppRoutesEnum.ABOUT, { path: RoutePath.about, element: <AboutPageLazy /> }],
];
