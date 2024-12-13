import NotFoundPage from "../../../pages/404Page";
import {
   AboutPageLazy,
   MainPageLazy,
   ProfilePageLazy,
} from "../../../pages/react-lazy";
import { RouteProps } from "react-router-dom";

export enum AppRoutesEnum {
   PROFILE = "profile",
   MAIN = "main",
   ABOUT = "about",
   NOTFOUND = "notfound",
}

export const RoutePath: Record<AppRoutesEnum, string> = {
   [AppRoutesEnum.PROFILE]: "/profile",
   [AppRoutesEnum.MAIN]: "/",
   [AppRoutesEnum.ABOUT]: "/about",
   [AppRoutesEnum.NOTFOUND]: "/*",
};

export const routeConfig: [AppRoutesEnum, RouteProps][] = [
   [
      AppRoutesEnum.PROFILE,
      { path: RoutePath.profile, element: <ProfilePageLazy /> },
   ],
   [AppRoutesEnum.MAIN, { path: RoutePath.main, element: <MainPageLazy /> }],
   [AppRoutesEnum.ABOUT, { path: RoutePath.about, element: <AboutPageLazy /> }],
   [
      AppRoutesEnum.NOTFOUND,
      { path: RoutePath.notfound, element: <NotFoundPage /> },
   ],
];
