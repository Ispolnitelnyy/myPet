import { lazy } from "react";

export const MainPageLazy = lazy(() => import("../mainPage"));

export const AboutPageLazy = lazy(() => import("../aboutPage"));

export const CounterPageLazy = lazy(
   () =>
      new Promise((resolve) => {
         // @ts-ignore
         setTimeout(() => resolve(import("../counterPage")), 1500);
      })
);
export const TranslatorPageLazy = lazy(
   () =>
      new Promise((resolve) => {
         // @ts-ignore
         setTimeout(() => resolve(import("../translatorPage")), 1500);
      })
);
