import {
   LOCAL_STORAGE_THEME_KEY,
   ThemeContext,
   ThemeStateEnums,
} from "app/providers/themeProvider/themeContext";
import { FC, ReactNode, useMemo, useState } from "react";


const defaultTheme =
   (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as ThemeStateEnums) ||
   ThemeStateEnums.DARK;



interface ThemeProviderProps {
   initialTheme?: ThemeStateEnums;
   children: ReactNode;
}



export const ThemeProvider: FC<ThemeProviderProps> = (props) => {
   const { initialTheme, children } = props;

   const [theme, setTheme] = useState<ThemeStateEnums>(initialTheme || defaultTheme);

   const defaultProps = useMemo(
      () => ({
          theme,
          setTheme,
      }),
      [theme]
   );

   return (
      <ThemeContext.Provider value={defaultProps}>
         {children}
      </ThemeContext.Provider>
   );
};

export default ThemeProvider;
