import { createContext } from "react";

export enum ThemeStateEnums {
   DARK = "dark",
   LIGHT = "light",
}

export interface themeContextProps {
   theme?: ThemeStateEnums;
   setTheme?: (theme: ThemeStateEnums) => void;
}
export const ThemeContext = createContext<themeContextProps>({});

export const LOCAL_STORAGE_THEME_KEY = "theme";
