import { EnhancedStore } from "@reduxjs/toolkit";
import { CounterSchema } from "entities/counter/model/types";
import { UserSchema } from "entities/user/model/types";
import { LoginSchema } from "features/user/authByUsername/model/types";
import { ReducerManager } from "../reduserManager";

export interface StateSchema {
   counter: CounterSchema;
   user: UserSchema;

   // async redusers:
   loginForm?: LoginSchema;
}

export type StateSchemaKey = keyof StateSchema;




// EnhancedStore - стандартный тип store redux 
export interface ReduxStoreReducerManager extends EnhancedStore<StateSchema>{
reducerManager: ReducerManager
}