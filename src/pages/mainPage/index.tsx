import Counter from "entities/counter";
import { useTranslation } from "react-i18next";

export const MainPage = (): JSX.Element => {
   const { t } = useTranslation();
   return (
      <div>
         {t("Главная страница")}
         <Counter />
      </div>
   );
};
export default MainPage;
