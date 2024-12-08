import { configureStore } from "@reduxjs/toolkit";
import { StateSchema } from "./stateSchema";

export function createReduxStore(initialState?: StateSchema){
    return configureStore<StateSchema>({
   reducer: {},
   devTools: __IS_DEV__, // отключаем дев тулзы из продакшена
   preloadedState: initialState // принимаем данные (для тестов) в initialState
});
}



// // экспорт типов RootState и AppDispatch из самого store.
// export type RootState = ReturnType<ReturnType<typeof createReduxStore>['getState']>;
// // Предполагаемый тип: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];