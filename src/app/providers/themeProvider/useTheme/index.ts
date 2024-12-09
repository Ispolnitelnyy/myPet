import { useContext } from "react";
import { LOCAL_STORAGE_THEME_KEY, ThemeContext, ThemeStateEnums } from "../themeContext";

interface UseThemeResult {
   toggleTheme: () => void;
   theme: ThemeStateEnums;
}

export function useTheme(): UseThemeResult {
   const { theme, setTheme } = useContext(ThemeContext);

   const toggleTheme = () => {
      const newTheme =
         theme === ThemeStateEnums.LIGHT
            ? ThemeStateEnums.DARK
            : ThemeStateEnums.LIGHT;
      setTheme(newTheme);
      // document.body.className = newTheme
      localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
   };
   return { theme, toggleTheme };
}
