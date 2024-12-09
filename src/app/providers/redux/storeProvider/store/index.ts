import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "entities/counter/model/slice"; // не работает абсолюттный путь
// import { counterReducer } from "../../../../../entities/counter/model/slice";
import { StateSchema } from "./stateSchema";

export function createReduxStore(initialState?: StateSchema) {
   return configureStore<StateSchema>({
      reducer: { counter: counterReducer },
      devTools: __IS_DEV__, // отключаем дев тулзы из продакшена
      preloadedState: initialState, // принимаем данные (для тестов) в initialState
   });
}
