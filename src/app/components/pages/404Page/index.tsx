import { classNames } from "app/components/shared/helpers/classNames";
import cls from "./index.module.scss";
import { useTranslation } from "react-i18next";

interface NotFoundPageProps {
   className?: string;
}

export const NotFoundPage = ({ className }: NotFoundPageProps) => {
   const { t } = useTranslation("404Page");
   return (
      <div className={classNames(cls.notfoundpage, {}, [className])}>
         {t("Такой страницы не существует")}
      </div>
   );
};

export default NotFoundPage;
