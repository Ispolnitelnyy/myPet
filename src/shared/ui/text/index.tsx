import { classNames, Mods } from "shared/helpers/classNames";
import cls from "./index.module.scss";
import { memo } from "react";

export enum TextThemeEnums {
   PRIMARY = "primary",
   ERROR = "error",
}
export enum TextAlignEnums {
   RIGHT = "right",
   LEFT = "left",
   CENET = "center",
}
interface TextProps {
   className?: string;
   title?: string;
   text?: string;
   theme?: TextThemeEnums;
   align?: TextAlignEnums;
}

export const Text = memo((props: TextProps) => {
   const {
      className,
      title,
      text,
      theme = TextThemeEnums.PRIMARY,
      align = TextAlignEnums.LEFT,
   } = props;

   const mods: Mods = {
      [cls[theme]]: true,
      [cls[align]]: true,
   };

   return (
      <div className={classNames(cls.component, mods, [className])}>
         {title && <p className={cls.title}>{title}</p>}
         {text && <p className={cls.text}>{text}</p>}
      </div>
   );
});

export default Text;
