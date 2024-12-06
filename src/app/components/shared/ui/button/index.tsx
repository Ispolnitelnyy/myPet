import { classNames } from "app/components/shared/helpers/classNames";
import cls from "./index.module.scss";
import { ButtonHTMLAttributes, FC } from "react";

export enum ThemeButtonEnums {
   CLEAR = "clear",
   OUTLINE = "outline",
   BACKGROUND = "background",
   BACKGROUND_INVERTED = "backgroundInverted",
}
export enum SizesButtonEnums {
   M = "sizeM",
   L = "sizeL",
   XL = "sizeXl",
   XXL = "sizeXxl",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   className?: string;
   theme?: ThemeButtonEnums;
   square?: boolean;
   size?: SizesButtonEnums;
}

export const Button: FC<ButtonProps> = (props) => {
   const {
      className,
      theme,
      children,
      square,
      size,
      ...otherProps
   } = props;

   const mods: Record<string, boolean> = {
      [cls[theme]]: true,
      [cls.square]: square,
      [cls[size]]: true,
   };
   return (
      <button
         type="button"
         className={classNames(cls.button, mods, [className])}
         {...otherProps}
      >
         {children}
      </button>
   );
};

export default Button;
