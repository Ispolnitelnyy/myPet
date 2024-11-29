import { FC, ReactNode, useMemo, useState } from "react";
import { LOCAL_STORAGE_THEME_KEY, ThemeContext } from "../context";

interface ThemeProviderProps {
  children: ReactNode;
}

export enum ThemeStateEnums {
  DARK = "dark",
  LIGHT = "light",
}

const defaultTheme =
  (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as ThemeStateEnums) || ThemeStateEnums.DARK;

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeStateEnums>(defaultTheme);

  const defaultProps = useMemo(
    () => ({
      theme: theme,
      setTheme: setTheme,
    }),
    [theme]
  );

  return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>;
};
