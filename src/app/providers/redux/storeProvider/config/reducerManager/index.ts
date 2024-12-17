import {
   UnknownAction,
   combineReducers,
   Reducer,
   ReducersMapObject,
} from "@reduxjs/toolkit";
import { StateSchema, StateSchemaKey } from "../stateSchema";
import { CombinedState } from "../../../../../../../node_modules/@types/react-redux/node_modules/redux/index.d";

export interface ReducerManager {
   getReducerMap: () => ReducersMapObject<StateSchema>;
   // state: StateSchema | undefined для совместимости с Redux, где state может быть undefined при инициализации
   // reduce: возвращаемое значение — StateSchema, так как combinedReducer всегда возвращает объект состояния.
   reduce: (
      state: StateSchema,
      action: UnknownAction
   ) => CombinedState<StateSchema>;
   add: (key: StateSchemaKey, reducer: Reducer) => void;
   remove: (key: StateSchemaKey) => void;
}

// createReducerManager принимает дефолтные reducers
export function createReducerManager(
   initialReducers: ReducersMapObject<StateSchema>
): ReducerManager {
   const reducers = { ...initialReducers };
   // c помощью combineReducers создаем корневой reducer
   let combinedReducer = combineReducers(reducers);
   // keysToRemove хранит в себе названия reducers которые надо удалить
   let keysToRemove: StateSchemaKey[] = [];

   return {
      // getReducerMap пролсто возвращает reducers
      getReducerMap: () => reducers,
      // в аргументах state, action как и у классического reducer
      // но если в keysToRemove есть ключи, то эти ключи из state полностью удаляем
      reduce: (state: StateSchema, action: UnknownAction) => {
         // Если состояние undefined, возвращаем начальное состояние
         if (keysToRemove.length > 0) {
            state = { ...state };

            keysToRemove.forEach((key) => {
               delete state![key as keyof StateSchema];
            });
            keysToRemove = [];
         }
         // возвращаем reducer cо state без лишних ключей
         // @ts-ignore
         return combinedReducer(state, action);
      },
      // add - по ключу добавляет новый reducer в reducer
      add: (key: StateSchemaKey, reducer: Reducer) => {
         if (!key || key in reducers) {
            return;
         }
         //  reducers[key] = reducer;
         reducers[key as keyof typeof reducers] = reducer;
         combinedReducer = combineReducers(reducers);
      },
      // remove - добавляет ключ в keysToRemove и удаляет этот ключ из reducer
      remove: (key: StateSchemaKey) => {
         if (!key || !(key in reducers)) {
            return;
         }
         delete reducers[key as keyof typeof reducers];
         keysToRemove.push(key);
         combinedReducer = combineReducers(reducers);
      },
   };
}

