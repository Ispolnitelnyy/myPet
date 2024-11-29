import { FC, ReactNode, useMemo, useState } from "react";
import { LOCAL_STORAGE_THEME_KEY, ThemeContext } from "../context";
import { Theme } from "../../..";

interface ThemeProviderProps {
  children: ReactNode;
}

const defaultTheme = (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.DARK;

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);


  return (
    <ThemeContext.Provider
      value={{
        theme: theme,
        setTheme: setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
