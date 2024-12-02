/* eslint-disable react/react-in-jsx-scope */

import { useTranslation } from "react-i18next";

const MainPage = (): JSX.Element => {
  const { t } = useTranslation('mainPage');
  return (
    <div>
      {t("главная страница")}
      {" - нажми на кнопку в sideBar"}
      <div>надо будет поменять шрифт, на русский текст не применяется</div>
    </div>
  );
};
export default MainPage;
