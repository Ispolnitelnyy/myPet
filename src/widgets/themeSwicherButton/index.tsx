import { useTheme } from "app/providers/themeProvider/useTheme";
import { classNames } from "shared/helpers/classNames";
import LightIcon from "../../../public/assets/icons/theme-light.svg";
import DarkIcon from "../../../public/assets/icons/theme-dark.svg";
import Button, { ThemeButtonEnums } from "shared/ui/button";
import { ThemeStateEnums } from "app/providers/themeProvider/themeContext";
import { memo } from "react";


interface ThemeSwicherButtonProps {
   className?: string;
}

 export const ThemeSwicherButton = memo(({ className }: ThemeSwicherButtonProps) => {
   const { theme, toggleTheme } = useTheme();
   return (
      <Button
         theme={ThemeButtonEnums.CLEAR}
         onClick={toggleTheme}
         className={classNames("", {}, [className])}
         square={false}
      >
         {theme === ThemeStateEnums.DARK ? <DarkIcon /> : <LightIcon />}
      </Button>
   );
});

export default ThemeSwicherButton;
