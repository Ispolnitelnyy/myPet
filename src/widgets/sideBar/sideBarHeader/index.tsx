import { classNames } from "shared/helpers/classNames";
import cls from "./index.module.scss";
import { AppRoutesEnum, routeConfig } from "shared/configs/routes";
import SideBarItem, { AppLinksRouters } from "../sideBarItem";
import { RouteProps } from "react-router-dom";
import { memo } from "react";

interface SideBarHeaderProps {
   className?: string;
   collapsed: boolean;
}

const appLinksRouters = routeConfig.filter(
   ([route]) => route !== AppRoutesEnum.NOTFOUND
) as [AppLinksRouters, RouteProps][];

 const SideBarHeader = ({ className, collapsed }: SideBarHeaderProps) => {
   return (
      <div className={classNames(cls.sidebarheader, {}, [className])}>
         {appLinksRouters.map(([route, { path, element }]) => {
            return (
               <SideBarItem
                  key={route}
                  path={path}
                  route={route}
                  collapsed={collapsed}
               />
            );
         })}
      </div>
   );
};

export default memo(SideBarHeader);
