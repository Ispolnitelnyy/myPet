import { CombinedState } from "../../../../../../../node_modules/@types/react-redux/node_modules/redux/index.d";

import { configureStore, Reducer, ReducersMapObject } from "@reduxjs/toolkit";
import { StateSchema } from "../stateSchema";
import { counterReducer } from "../../../../../../entities/counter/model/slice";
import { userReducer } from "../../../../../../entities/user/model/slice";
// loginReducer подгружаем асинхронно через store.reducerManager.add непосредственно в самом компоненте LoginForm
// import { loginReducer } from "features/user/authByUsername/model/slice";
import { createReducerManager } from "../reducerManager";
import { $apiCreateBase } from "shared/api";
import { NavigateOptions, To } from "react-router-dom";

export function createReduxStore(
   initialState?: StateSchema,
   asyncReducers?: ReducersMapObject<StateSchema>,
   navigate?: (to: To, options?: NavigateOptions) => void
) {
   const rootReducers: ReducersMapObject<StateSchema> = {
      ...asyncReducers,
      counter: counterReducer,
      user: userReducer,
   };

   //createReducerManager для асинхронной подгрузки reducers в store
   const reducerManager = createReducerManager(rootReducers);

   const store = configureStore({
      reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
      devTools: __IS_DEV__, // отключаем дев тулзы из продакшена
      preloadedState: initialState, // принимаем данные (для тестов) в initialState

      middleware: (getDefaultMiddleware) =>
         getDefaultMiddleware({
            thunk: {
               // аргумент extra асинзронного thunkApi
               extraArgument: {
                  api: $apiCreateBase,
                  navigate: navigate,
               },
            },
         }),
   });

   // @ts-ignore
   store.reducerManager = reducerManager;

   return store;
}

// Типизированный dispatch для работы с асинзронными санками
export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
// Тип, который описывает структуру всего Redux-хранилища
export type RootState = ReturnType<typeof createReduxStore>["getState"];
