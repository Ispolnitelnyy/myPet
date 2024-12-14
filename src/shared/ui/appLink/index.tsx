import { classNames } from "shared/helpers/classNames";
import cls from "./index.module.scss";
import { memo } from "react";
import { Link, LinkProps } from "react-router-dom";

export enum AppLinkEnum {
   PRIMARY = "primary",
   SECONDARY = "secondary",
   RED = "red",
}

interface AppLinkProps extends LinkProps {
   className?: string;
   theme?: AppLinkEnum;
   children: React.ReactNode;
}
// оборачиваем в memo так как в качестве children будет примитив - string
export const AppLink = memo((props: AppLinkProps) => {
   const {
      to,
      className,
      children,
      theme = AppLinkEnum.PRIMARY,
      ...otherProps
   } = props;
   return (
      <Link
         to={to}
         className={classNames(cls.applink, {}, [className, cls[theme]])}
      >
         {children}
      </Link>
   );
});

export default AppLink;
