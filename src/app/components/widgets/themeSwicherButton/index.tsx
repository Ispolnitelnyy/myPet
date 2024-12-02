/* eslint-disable react/react-in-jsx-scope */
import { useTheme } from "./hook";
import { classNames } from "app/components/shared/helpers/classNames";
import LightIcon from "app/static/assets/icons/theme-light.svg";
import DarkIcon from "app/static/assets/icons/theme-dark.svg";
import { ThemeStateEnums } from "app/providers/themeProvider";
import Button, { ThemeButtonEnums } from "../../shared/ui/button";

interface ThemeSwicherButtonProps {
  className?: string;
}

export const ThemeSwicherButton = ({ className }: ThemeSwicherButtonProps) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button
      theme={ThemeButtonEnums.CLEAR}
      onClick={toggleTheme}
      className={classNames('', {}, [className])}
    >
      {theme === ThemeStateEnums.LIGHT ? <DarkIcon /> : <LightIcon />}
    </Button>
  );
};

export default ThemeSwicherButton;
