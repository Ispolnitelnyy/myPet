import { classNames } from "shared/helpers/classNames";
import cls from "./index.module.scss";

export enum TextThemeEnums {
   PRIMARY = "primary",
   ERROR = "error",
}

interface TextProps {
   className?: string;
   title?: string;
   text?: string;
   theme?: TextThemeEnums;
}

export const Text = (props: TextProps) => {
   const { className, title, text, theme = TextThemeEnums.PRIMARY } = props;

   return (
      <div
         className={classNames(cls.component, { [cls[theme]]: true }, [
            className,
         ])}
      >
         {title && <p className={cls.title}>{title}</p>}
         {text && <p className={cls.text}>{text}</p>}
      </div>
   );
};

export default Text;
