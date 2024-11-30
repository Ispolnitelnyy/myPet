import { useTheme } from "./hook";
import { classNames } from "app/components/shared/helpers/classNames";
import cls from "./index.module.scss";

import LightIcon from "../../../../static/assets/icons/theme-light.svg";
import DarkIcon from "../../../../static/assets/icons/theme-dark.svg";
import { ThemeStateEnums } from "app/providers/themeProvider";

interface ThemeSwicherButtonProps {
  className?: string;
}

export const ThemeSwicherButton = ({ className }: ThemeSwicherButtonProps) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} className={classNames(cls.btn, {}, [className])}>
      {theme === ThemeStateEnums.LIGHT ? <DarkIcon /> : <LightIcon />}
    </button>
  );
};

export default ThemeSwicherButton;
// import { NavBar } from "app/components/widgets/navBar";
