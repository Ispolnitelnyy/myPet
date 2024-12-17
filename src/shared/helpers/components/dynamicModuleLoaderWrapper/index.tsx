import { Reducer } from "@reduxjs/toolkit";
import { useAppDispatch } from "app/providers/redux/hooks";
import {
   ReduxStoreReducerManager,
   StateSchemaKey,
} from "app/providers/redux/storeProvider/config/stateSchema";
import { FC, useEffect } from "react";
import { useStore } from "react-redux";

export type ReducersList = Partial<Record<StateSchemaKey, Reducer>>;

interface DynamicModuleLoaderWrapperProps {
   //    keyname: StateSchemaKey;
   reducers: ReducersList;
   removeAfterUnmount?: boolean;
   children?: React.ReactNode;
}

export const DynamicModuleLoaderWrapper: FC<DynamicModuleLoaderWrapperProps> = (props) => {
   const { children, reducers, removeAfterUnmount } = props;

   const store = useStore() as ReduxStoreReducerManager; // получаем redux store
   const dispatch = useAppDispatch();

   useEffect(() => {
      Object.entries(reducers).forEach(
         ([keyname, reducer]) => {
            // в момент монтирования компонента добавляем редьюсер с помощью reducerManager
            // в качестве ключа (keyname) передаем строку, вторым аргументом сам reducer
            store.reducerManager.add(keyname as StateSchemaKey, reducer);
            dispatch({ type: `@INIT ${keyname} reducer` });
         }
      );

      // в момент размонтирования будем удалять reducer
      return () => {
         Object.entries(reducers).forEach(
            ([keyname, reducer]) => {
               if (removeAfterUnmount) {
                  store.reducerManager.remove(keyname as StateSchemaKey);
                  dispatch({ type: `@DESTROY ${keyname} reducer` });
               }
            }
         );
      };
   }, []);

   return <>{children}</>;
};

export default DynamicModuleLoaderWrapper;
