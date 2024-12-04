
import { classNames } from "app/components/shared/helpers/classNames";
import cls from "./index.module.scss";
import { ButtonHTMLAttributes, FC } from "react";

export enum ThemeButtonEnums {
   CLEAR = "clear",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   className?: string;
   theme?: ThemeButtonEnums;
}

export const Button: FC<ButtonProps> = (props) => {
   const { className, theme, children, ...otherProps } = props;
   return (
      <button
         className={classNames(cls.button, {}, [className, cls[theme]])}
         {...otherProps}
      >
         {children}
      </button>
   );
};

export default Button;
