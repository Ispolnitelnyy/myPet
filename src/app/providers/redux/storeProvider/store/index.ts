import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { StateSchema } from "./stateSchema";
import { counterReducer } from "entities/counter/model/slice";
import { userReducer } from "entities/user/model/slice";

export function createReduxStore(initialState?: StateSchema) {
   const rootReduser: ReducersMapObject<StateSchema> = {
      counter: counterReducer,
      user: userReducer,
   };

   return configureStore<StateSchema>({
      reducer: rootReduser,
      devTools: __IS_DEV__, // отключаем дев тулзы из продакшена
      preloadedState: initialState, // принимаем данные (для тестов) в initialState
   });
}
