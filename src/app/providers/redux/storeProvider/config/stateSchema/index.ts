import { EnhancedStore } from "@reduxjs/toolkit";
import { CounterSchema } from "entities/counter/model/types";
import { UserSchema } from "entities/user/model/types";
import { LoginSchema } from "features/authByUsername/model/types";
import { ReducerManager } from "../reduserManager";
import { ProfileSchema } from "entities/profile/model/types";
import { AxiosInstance } from "axios";
import { NavigateOptions, To } from "react-router-dom";

export interface StateSchema {
   counter: CounterSchema;
   user: UserSchema;

   // async redusers:
   loginForm?: LoginSchema;
   profile?: ProfileSchema;
}

export type StateSchemaKey = keyof StateSchema; // ключи редьюсеров

// EnhancedStore - стандартный тип store redux
export interface ReduxStoreReducerManager extends EnhancedStore<StateSchema> {
   reducerManager: ReducerManager;
}

interface ThunkExtraArg {
   api: AxiosInstance;
   navigate: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkConfig<T> {
   extra: ThunkExtraArg;
   rejectValue: T; // Для типа ошибок
}
