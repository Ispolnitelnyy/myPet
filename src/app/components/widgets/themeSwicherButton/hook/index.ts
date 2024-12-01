import { useContext } from "react";
import { LOCAL_STORAGE_THEME_KEY, ThemeContext } from "../context";
import { ThemeStateEnums } from "../../../../providers/themeProvider";

interface UseThemeResult {
  toggleTheme: () => void;
  theme: ThemeStateEnums;
}

export function useTheme(): UseThemeResult {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    const newTheme = theme === ThemeStateEnums.LIGHT ? ThemeStateEnums.DARK : ThemeStateEnums.LIGHT;
    setTheme(newTheme);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  };
  return { theme, toggleTheme };
}
