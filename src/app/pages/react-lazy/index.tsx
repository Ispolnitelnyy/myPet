import { lazy } from "react";

export const MainPageLazy = lazy(() => import("../mainPage"));
export const AboutPageLazy = lazy(() => import("../aboutPage"));
export const CounterPageLazy = lazy(() => import("../counterPage"));
export const TranslatorPageLazy = lazy(() => import("../translatorPage"));
