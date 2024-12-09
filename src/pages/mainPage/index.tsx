import { useTranslation } from "react-i18next";

export const MainPage = (): JSX.Element => {
   const { t } = useTranslation();
   return (
      <div>
         {t("Главная страница")}
      </div>
   );
};
export default MainPage;
