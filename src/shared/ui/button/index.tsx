import { classNames } from "shared/helpers/classNames";
import cls from "./index.module.scss";
import { ButtonHTMLAttributes, memo } from "react";

export enum ThemeButtonEnums {
   CLEAR = "clear",
   CLEAR_INVERTED = "clearinverted",
   OUTLINE = "outline",
   BACKGROUND = "background",
   BACKGROUND_INVERTED = "backgroundinverted",
}
export enum SizesButtonEnums {
   M = "sizem",
   L = "sizel",
   XL = "sizexl",
   XXL = "sizexxl",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   className?: string;
   theme?: ThemeButtonEnums;
   square?: boolean;
   size?: SizesButtonEnums;
   disabled?: boolean;
   children: React.ReactNode;
}
// оборачиваем в memo так как в качестве children будет примитив - string
export const Button = memo((props: ButtonProps) => {
   const { className, theme, children, square, size, disabled, ...otherProps } =
      props;

   const mods: Record<string, boolean> = {
      [cls[theme]]: true,
      [cls.square]: square,
      [cls[size]]: true,
      [cls.disabled]: disabled,
   };
   return (
      <button
         type="button"
         className={classNames(cls.button, mods, [className])}
         disabled={disabled}
         {...otherProps}
      >
         {children}
      </button>
   );
});

export default Button;
