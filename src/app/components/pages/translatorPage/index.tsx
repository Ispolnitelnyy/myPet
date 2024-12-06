
import { useTranslation } from "react-i18next";

export const TranslatorPage = () => {
   const { t } = useTranslation("translatorPage");
   return (
      <div>
         <div>{t("тестовый пример")}</div>
      </div>
   );
};

export default TranslatorPage;
