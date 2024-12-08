import { configureStore } from "@reduxjs/toolkit";
import { StateSchema } from "./stateSchema";

export function createReduxStore(initialState?: StateSchema){
    return configureStore<StateSchema>({
   reducer: {},
   devTools: __IS_DEV__, // отключаем дев тулзы из продакшена
   preloadedState: initialState // принимаем данные (для тестов) в initialState
});
}
