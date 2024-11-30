import { classNames } from "app/components/shared/helpers/classNames";
import cls from "./index.module.scss";
import { FC } from "react";
import { Link, LinkProps } from "react-router-dom";

export enum AppLinkEnum {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  RED = "red",
}

interface AppLinkProps extends LinkProps {
  className?: string;
  theme?: AppLinkEnum;
}

export const AppLink: FC<AppLinkProps> = (props) => {
  const { to, className, children, theme = AppLinkEnum.PRIMARY, ...otherProps } = props;
  return (
    <Link to={to} className={classNames(cls.appLink, {}, [className, cls[theme]])}>
      {children}
    </Link>
  );
};

export default AppLink;
