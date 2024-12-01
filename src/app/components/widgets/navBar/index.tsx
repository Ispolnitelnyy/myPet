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
        <AppLink theme={AppLinkEnum.PRIMARY} to={"/"} className={cls.mainLink}>
          main page
        </AppLink>
        <AppLink theme={AppLinkEnum.SECONDARY} to={"/about"} className={cls.mainLink}>
          about page
        </AppLink>
        <AppLink theme={AppLinkEnum.RED} to={"/counter"} className={cls.mainLink}>
          counter page
        </AppLink>
        <AppLink theme={AppLinkEnum.SECONDARY} to={"/translator"} className={cls.mainLink}>
          translator page
        </AppLink>
      </div>
    </div>
  );
};

export default NavBar;
