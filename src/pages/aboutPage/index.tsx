import { useTranslation } from "react-i18next";

export const AboutPage = (): JSX.Element => {
   const { t } = useTranslation();
   return <> {t("О сайте")}</>;
};
export default AboutPage;
