import { configureStore, ReducersMapObject, combineReducers } from "@reduxjs/toolkit";
import { StateSchema } from "./stateSchema";
import { counterReducer } from "entities/counter/model/slice";
import { userReducer } from "entities/user/model/slice";
import { loginReducer } from "features/user/authByUsername/model/slice";

export function createReduxStore(initialState?: StateSchema) {
   const rootReducer: ReducersMapObject<StateSchema> = {
      counter: counterReducer,
      user: userReducer,
      loginForm: loginReducer,
   };

   const combinedReducer = combineReducers(rootReducer);

   const store = configureStore({
      reducer: combinedReducer,
      devTools: __IS_DEV__, // отключаем дев тулзы из продакшена
      preloadedState: initialState, // принимаем данные (для тестов) в initialState
   });

   return store;
}

// Тип для dispatch
export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
// Тип для state
export type RootState = ReturnType<typeof createReduxStore>["getState"];
