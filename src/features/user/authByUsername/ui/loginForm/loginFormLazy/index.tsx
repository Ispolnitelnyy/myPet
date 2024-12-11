import { FC, lazy } from "react";
import { LoginFormProps } from "../../loginForm";

export const LoginFormLazy = lazy<FC<LoginFormProps>>(
    () =>
       new Promise((resolve) => {
          // @ts-ignore
          setTimeout(() => resolve(import("../../loginForm")), 1500);
       })
 );