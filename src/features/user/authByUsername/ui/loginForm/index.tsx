import { classNames } from "shared/helpers/classNames";
import cls from "./index.module.scss";
import { useTranslation } from "react-i18next";
import Button from "shared/ui/button";
import Input from "shared/ui/input";
// import { useDispatch } from "react-redux"; // использую кастомный useAppDispatch который уже имее тип <AppDispatch>
// import { AppDispatch } from "app/providers/redux/storeProvider/store";
import { memo, useCallback } from "react";
import { loginActions, loginReducer } from "../../model/slice";
// import { getLoginState } from "../../model/selectors/getLoginState";
import { loginByUsername } from "../../model/services/loginByUsername";
import { useAppDispatch, useAppSelector } from "app/providers/redux/hooks";
import Text, { TextThemeEnums } from "shared/ui/text";
// import { useStore } from "react-redux";
// import { ReduxStoreReducerManager } from "app/providers/redux/storeProvider/config/stateSchema";
import { getLoginUsername } from "../../model/selectors/getLoginUsernameSelector";
import { getLoginIsLoading } from "../../model/selectors/getLoginIsLoadingSelector";
import { getLoginError } from "../../model/selectors/getLoginErrorSelector";
import { getLoginPassword } from "../../model/selectors/getLoginPasswordSelector";
import DynamicModuleLoaderWrapper, {
   ReducersList,
} from "shared/helpers/components/dynamicModuleLoaderWrapper";

export interface LoginFormProps {
   className?: string;
}

const initialReducers: ReducersList = {
   loginForm: loginReducer,
};

export const LoginForm = memo(({ className }: LoginFormProps) => {
   // const dispatch = useDispatch<AppDispatch>();
   const dispatch = useAppDispatch();
   // const { username, password, error, isLoading } =
   //    useAppSelector(getLoginState);
   const username = useAppSelector(getLoginUsername);
   const password = useAppSelector(getLoginPassword);
   const error = useAppSelector(getLoginError);
   const isLoading = useAppSelector(getLoginIsLoading);

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

   const onLoginClick = useCallback(() => {
      dispatch(loginByUsername({ username, password }));
   }, [dispatch, username, password]);

   const { t } = useTranslation();
   return (
      <DynamicModuleLoaderWrapper removeAfterUnmount reducers={initialReducers}>
         <div className={classNames(cls.loginform, {}, [className])}>
            <Text title={"Авторизация"} />
            {error && <Text text={error} theme={TextThemeEnums.ERROR} />}
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
            <Button
               disabled={isLoading}
               className={cls.loginbtn}
               onClick={onLoginClick}
            >
               {t("Войти")}
            </Button>
         </div>
      </DynamicModuleLoaderWrapper>
   );
});

export default LoginForm;
