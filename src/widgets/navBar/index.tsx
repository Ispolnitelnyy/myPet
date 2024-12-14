import { classNames } from "shared/helpers/classNames";
import cls from "./index.module.scss";
import { memo, useCallback, useState } from "react";
import Button, { ThemeButtonEnums } from "shared/ui/button";
import { useTranslation } from "react-i18next";
import LoginModal from "features/user/authByUsername/ui/loginModal";
import { useAppDispatch, useAppSelector } from "app/providers/redux/hooks";
import { getUserAuthData } from "../../entities/user/model/selectors/getUserAuthData";
import { userActions } from "../../entities/user/model/slice";

interface NavBarProps {
   className?: string;
}

export const NavBar = memo(({ className }: NavBarProps) => {
   const { t } = useTranslation();
   const [isAuthModal, setIsAuthModal] = useState(false);
   const authData = useAppSelector(getUserAuthData);
   const dispatch = useAppDispatch();

   const onCloseModal = useCallback(() => {
      setIsAuthModal(false);
   }, []);
   const onOpenModal = useCallback(() => {
      setIsAuthModal(true);
   }, []);
   const onLogout = useCallback(() => {
      dispatch(userActions.logout());
   }, [dispatch]);

   if (authData) {
      return (
         <div className={classNames(cls.navbar, {}, [className])}>
            <Button
               theme={ThemeButtonEnums.OUTLINE}
               className={cls.links}
               onClick={onLogout}
            >
               {t("Выйти")}
            </Button>
         </div>
      );
   }

   return (
      <div className={classNames(cls.navbar, {}, [className])}>
         <Button
            theme={ThemeButtonEnums.OUTLINE}
            className={cls.links}
            onClick={onOpenModal}
         >
            {t("Войти")}
         </Button>
         {isAuthModal && (
            <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
         )}
      </div>
   );
});

export default NavBar;
