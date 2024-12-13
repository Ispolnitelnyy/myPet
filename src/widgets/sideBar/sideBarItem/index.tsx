import { classNames } from "shared/helpers/classNames";
import cls from "./index.module.scss";
import AppLink, { AppLinkEnum } from "shared/ui/appLink";
import { AppRoutesEnum } from "shared/configs/routes";
import ProfileIcon from "../../../../public/assets/icons/profile-20-20.svg";
import MainIcon from "../../../../public/assets/icons/main-20-20.svg";
import AboutIcon from "../../../../public/assets/icons/about-20-20.svg";
import { memo } from "react";

export type AppLinksRouters = Exclude<AppRoutesEnum, AppRoutesEnum.NOTFOUND>;

interface SideBarItemProps {
   className?: string;
   path: string;
   collapsed: boolean;
   route: AppLinksRouters;
}

const appLinksIcons: Record<
   AppLinksRouters,
   React.FC<{ className?: string }>
> = {
   [AppRoutesEnum.PROFILE]: ProfileIcon,
   [AppRoutesEnum.MAIN]: MainIcon,
   [AppRoutesEnum.ABOUT]: AboutIcon,
};

const SideBarItem = (props: SideBarItemProps) => {
   const { className, path, collapsed, route } = props;
   const AppLinkIcon = appLinksIcons[route];
   return (
      <div className={classNames(cls.item, {}, [className])}>
         <AppLink theme={AppLinkEnum.RED} to={path} className={cls.itemname}>
            {AppLinkIcon && <AppLinkIcon className={cls.icon} />}
            {!collapsed && route && <span className={cls.link}>{route}</span>}
         </AppLink>
      </div>
   );
};

export default SideBarItem;
