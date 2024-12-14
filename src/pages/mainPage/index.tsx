import { lruMemoize } from "@reduxjs/toolkit";
import { useTranslation } from "react-i18next";

export const MainPage = lruMemoize((): JSX.Element => {
   const { t } = useTranslation();
   return <div>{t("Главная страница")}</div>;
});
export default MainPage;
