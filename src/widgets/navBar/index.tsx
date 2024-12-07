import { classNames } from "shared/helpers/classNames";
import cls from "./index.module.scss";
import Modal from "shared/ui/modal";
import { useCallback, useState } from "react";
import Button, { ThemeButtonEnums } from "shared/ui/button";
import { useTranslation } from "react-i18next";

interface NavBarProps {
   className?: string;
}

export const NavBar = ({ className }: NavBarProps) => {
   const { t } = useTranslation();
   const [isAuthModal, setIsAuthModal] = useState(false);

   const onToggleModal = useCallback(() => {
      setIsAuthModal((prev) => !prev);
   }, []);

   return (
      <div className={classNames(cls.navbar, {}, [className])}>
         <Button
            theme={ThemeButtonEnums.OUTLINE}
            className={cls.links}
            onClick={onToggleModal}
         >
            {t("Войти")}
         </Button>
         <Modal isOpen={isAuthModal} onClose={onToggleModal}>
            {t(
               "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid commodi consequatur eligendi impedit incidunt necessitatibus possimus quis saepe sunt totam."
            )}
         </Modal>
      </div>
   );
};

export default NavBar;
