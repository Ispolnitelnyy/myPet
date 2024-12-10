import { useState } from "react";
import { useTranslation } from "react-i18next";
import Input from "shared/ui/input";

export const MainPage = (): JSX.Element => {
   const [value, setValue] = useState("");
   const onChange = (val: string) => {
      setValue(val);
   };
   const { t } = useTranslation();
   return (
      <div>
         {t("Главная страница")}
         <Input value={value} onChange={onChange}  placeholder={"Ввод"}/>
      </div>
   );
};
export default MainPage;
