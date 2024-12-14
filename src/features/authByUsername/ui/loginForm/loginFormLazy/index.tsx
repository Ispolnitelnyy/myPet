import { FC, lazy } from "react";
import { LoginFormProps } from "..";

export const LoginFormLazy = lazy<FC<LoginFormProps>>(
   () =>
      new Promise((resolve) => {
         // @ts-ignore
         setTimeout(() => resolve(import("..")), 1500);
      })
);
