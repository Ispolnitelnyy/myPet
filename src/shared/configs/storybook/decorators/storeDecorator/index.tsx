import { StoryFn } from "@storybook/react"; // Используем правильный тип
import StoreProvider from "app/providers/redux/storeProvider";
import { StateSchema } from "app/providers/redux/storeProvider/config/stateSchema";
import { DeepPartial } from "../../../../../../node_modules/@types/react-redux/node_modules/redux/index.d";
import { ReducersMapObject } from "@reduxjs/toolkit";
import { loginReducer } from "features/authByUsername/model/slice";
import { profileReducer } from "entities/profile/model/slice";

const defaulAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
   loginForm: loginReducer,
   profile: profileReducer,
};

export const StoreDecorator =
   (
      state: DeepPartial<StateSchema>,
      asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
   ) =>
   (StoryComponent: StoryFn) =>
      (
         <StoreProvider
            initialState={state}
            asyncReducers={{ ...defaulAsyncReducers, ...asyncReducers }}
         >
            <StoryComponent />
         </StoreProvider>
      );
