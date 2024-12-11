import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { StateSchema } from "../stateSchema";
import { counterReducer } from "../../../../../../entities/counter/model/slice";
import { userReducer } from "../../../../../../entities/user/model/slice";
// loginReducer подгружаем асинхронно через store.reducerManager.add непосредственно в самом компоненте LoginForm
// import { loginReducer } from "features/user/authByUsername/model/slice";
import { createReducerManager } from "../reduserManager";

export function createReduxStore(initialState?: StateSchema) {
   const rootReducer: ReducersMapObject<StateSchema> = {
      counter: counterReducer,
      user: userReducer,
   };

   //createReducerManager для асинхронной подгрузки reducers в store
   // const reduсerManager = createReducerManager(rootReducer); // Обратите внимание: "c" в "reduсerManager" — это не латинская "c", а кириллическая "с".
   const reducerManager  = createReducerManager(rootReducer);

   const store = configureStore<StateSchema>({
      reducer: reducerManager.reduce,
      devTools: __IS_DEV__, // отключаем дев тулзы из продакшена
      preloadedState: initialState, // принимаем данные (для тестов) в initialState
   });

   // @ts-ignore
   store.reducerManager  = reducerManager ;

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
