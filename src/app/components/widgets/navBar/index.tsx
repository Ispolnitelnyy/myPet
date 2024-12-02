/* eslint-disable react/react-in-jsx-scope */
import { classNames } from "app/components/shared/helpers/classNames";
import cls from "./index.module.scss";
import AppLink, { AppLinkEnum } from "app/components/shared/ui/appLink";

interface NavBarProps {
   className?: string;
}

export const NavBar = ({ className }: NavBarProps) => {
   return (
      <div className={classNames(cls.navbar, {}, [className])}>
         <div className={cls.links}>
            <AppLink
               theme={AppLinkEnum.PRIMARY}
               to={"/"}
               className={cls.mainlink}
            >
               main page
            </AppLink>
            <AppLink
               theme={AppLinkEnum.SECONDARY}
               to={"/about"}
               className={cls.mainlink}
            >
               about page
            </AppLink>
            <AppLink
               theme={AppLinkEnum.RED}
               to={"/counter"}
               className={cls.mainlink}
            >
               counter page
            </AppLink>
            <AppLink
               theme={AppLinkEnum.SECONDARY}
               to={"/translator"}
               className={cls.mainlink}
            >
               translator page
            </AppLink>
         </div>
      </div>
   );
};

export default NavBar;
