import { classNames } from "shared/helpers/classNames";
import cls from "./index.module.scss";
import AppLink, { AppLinkEnum } from "shared/ui/appLink";
import { RoutePath } from "shared/configs/routes";
import MainIcon from "../../../../public/assets/icons/main-20-20.svg";
import AboutIcon from "../../../../public/assets/icons/about-20-20.svg";

interface SideBarHeaderProps {
   className?: string;
   collapsed: boolean;
}

export const SideBarHeader = ({ className, collapsed }: SideBarHeaderProps) => {
   return (
      <>
         <div className={cls.items}>
            <AppLink
               theme={AppLinkEnum.RED}
               to={RoutePath.main}
               className={cls.item}
            >
               <MainIcon className={cls.icon} />
               {!collapsed && <span className={cls.link}>main page</span>}
            </AppLink>
         </div>

         <div className={cls.items}>
            <AppLink
               theme={AppLinkEnum.RED}
               to={RoutePath.about}
               className={cls.item}
            >
               <AboutIcon className={cls.icon} />
               {!collapsed && <span className={cls.link}>about page</span>}
            </AppLink>
         </div>
      </>
   );
};

export default SideBarHeader;
