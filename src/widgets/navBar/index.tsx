import { classNames } from "shared/helpers/classNames";
import cls from "./index.module.scss";
import Modal from "shared/ui/modal";
import { useCallback, useState } from "react";
import Button, { ThemeButtonEnums } from "shared/ui/button";
import { useTranslation } from "react-i18next";
import LoginModal from "features/user/authByUsername/ui/loginModal";

interface NavBarProps {
   className?: string;
}

export const NavBar = ({ className }: NavBarProps) => {
   const { t } = useTranslation();
   const [isAuthModal, setIsAuthModal] = useState(false);

   const onCloseModal = useCallback(() => {
      setIsAuthModal(false);
   }, []);
   const onOpenModal = useCallback(() => {
      setIsAuthModal(true);
   }, []);

   return (
      <div className={classNames(cls.navbar, {}, [className])}>
         <Button
            theme={ThemeButtonEnums.OUTLINE}
            className={cls.links}
            onClick={onOpenModal}
         >
            {t("Войти")}
         </Button>
         <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
      </div>
   );
};

export default NavBar;
