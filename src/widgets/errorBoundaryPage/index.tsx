import { classNames } from "shared/helpers/classNames";
import cls from "./index.module.scss";
import { useTranslation } from "react-i18next";
import Button from "shared/ui/button";

interface ErrorBoundaryPageProps {
   className?: string;
}

export const ErrorBoundaryPage = ({ className }: ErrorBoundaryPageProps) => {
   const { t } = useTranslation("errorBoundaryPage");
   const reloadPage = () => {
      location.reload();
   };
   return (
      <div className={classNames(cls.errorboundarypage, {}, [className])}>
         <p>{t("Возникла непредвиденная ошибка")}</p>
         <Button square={false} onClick={reloadPage}>
            {t("Перезагрузить страницу")}
         </Button>
      </div>
   );
};

export default ErrorBoundaryPage;
