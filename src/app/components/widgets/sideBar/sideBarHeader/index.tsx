import { classNames } from "app/components/shared/helpers/classNames";
import cls from "./index.module.scss";
import AppLink, { AppLinkEnum } from "app/components/shared/ui/appLink";
import { RoutePath } from "app/components/shared/configs/routes";
import MainIcon from "../../../../../../public/assets/icons/main-20-20.svg";
import AboutIcon from "../../../../../../public/assets/icons/about-20-20.svg";

interface SideBarHeaderProps {
   className?: string;
   collapsed: boolean;
}

export const SideBarHeader = ({ className, collapsed }: SideBarHeaderProps) => {
   return (
      <div className={classNames(cls.sidebarheader, {}, [className])}>
         <div className={cls.item}>
            <AppLink
               theme={AppLinkEnum.RED}
               to={RoutePath.main}
               className={cls.link}
            >
               <MainIcon className={cls.icon} />
               {!collapsed && <span>main page</span>}
            </AppLink>
         </div>

         <div className={cls.item}>
            <AppLink
               theme={AppLinkEnum.RED}
               to={RoutePath.about}
               className={cls.link}
            >
               <AboutIcon className={cls.icon} />
               {!collapsed && <span>about page</span>}
            </AppLink>
         </div>

         <AppLink
            theme={AppLinkEnum.RED}
            to={RoutePath.counter}
            className={cls.link}
         >
            {!collapsed && <span>counter page</span>}
         </AppLink>
         <AppLink
            theme={AppLinkEnum.RED}
            to={RoutePath.translator}
            className={cls.link}
         >
            {!collapsed && <span>translator page</span>}
         </AppLink>
      </div>
   );
};

export default SideBarHeader;
