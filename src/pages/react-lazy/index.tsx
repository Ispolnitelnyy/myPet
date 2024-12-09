import { lazy } from "react";

export const MainPageLazy = lazy(() => import("../mainPage"));

export const AboutPageLazy = lazy(
   () =>
      new Promise((resolve) => {
         // @ts-ignore
         setTimeout(() => resolve(import("../aboutPage")), 1500);
      })
);