import { classNames } from "shared/helpers/classNames";
import cls from "./index.module.scss";
import { useTranslation } from "react-i18next";
import Button from "shared/ui/button";
import Input from "shared/ui/input";
import { useDispatch } from "react-redux";
import { memo, useCallback } from "react";
import { loginActions } from "../../model/slice";
import { useSelector } from "react-redux";
import { getLoginState } from "../../model/selectors/getLoginState";
import { loginByUsername } from "../../model/services/loginByUsername";
import { AppDispatch } from "app/providers/redux/storeProvider/store";

interface LoginFormProps {
   className?: string;
}

export const LoginForm = memo(({ className }: LoginFormProps) => {
   const dispatch = useDispatch<AppDispatch>();

   const onChangeUsername = useCallback(
      (value: string) => {
         dispatch(loginActions.setUsername(value));
      },
      [dispatch]
   );
   const onChangePassword = useCallback(
      (value: string) => {
         dispatch(loginActions.setPassword(value));
      },
      [dispatch]
   );

   const { username, password } = useSelector(getLoginState);

   const onLoginClick = useCallback(() => {
      dispatch(loginByUsername({ username, password }));
   }, [dispatch, username, password]);

   const { t } = useTranslation();
   return (
      <div className={classNames(cls.loginform, {}, [className])}>
         <Input
            autofocus={true}
            placeholder="Логин"
            className={cls.input}
            type="text"
            onChange={onChangeUsername}
            value={username}
         />
         <Input
            placeholder="Пароль"
            className={cls.input}
            type="password"
            onChange={onChangePassword}
            value={password}
         />
         <Button className={cls.loginbtn} onClick={onLoginClick}>
            {t("Войти")}
         </Button>
      </div>
   );
});

export default LoginForm;
