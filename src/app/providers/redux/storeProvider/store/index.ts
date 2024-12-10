import {
   configureStore,
   ReducersMapObject,
   combineReducers,
} from "@reduxjs/toolkit";
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

   const store = configureStore<StateSchema>({
      reducer: combinedReducer,
      devTools: __IS_DEV__, // отключаем дев тулзы из продакшена
      preloadedState: initialState, // принимаем данные (для тестов) в initialState
   });

   return store;
}

// Типизированный dispatch для работы с асинзронными санками
export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
// Тип, который описывает структуру всего Redux-хранилища
export type RootState = ReturnType<typeof createReduxStore>["getState"];

export interface ThunkConfig<T = void> {
   state: StateSchema;
   dispatch: AppDispatch;
   rejectValue: T; // Для типа ошибок
}
