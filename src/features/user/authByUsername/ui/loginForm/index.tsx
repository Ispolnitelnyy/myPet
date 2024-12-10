import { classNames } from "shared/helpers/classNames";
import cls from "./index.module.scss";
import { useTranslation } from "react-i18next";
import Button from "shared/ui/button";
import Input from "shared/ui/input";

interface LoginFormProps {
   className?: string;
}

export const LoginForm = ({ className }: LoginFormProps) => {
   const { t } = useTranslation();
   return (
      <div className={classNames(cls.loginform, {}, [className])}>
         <Input
            autofocus={true}
            placeholder="Логин"
            className={cls.input}
            type="text"
         />
         <Input placeholder="Пароль" className={cls.input} type="password" />
         <Button className={cls.loginbtn}>{t("Войти")}</Button>
      </div>
   );
};

export default LoginForm;
