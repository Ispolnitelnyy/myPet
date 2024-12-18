import { StoryFn } from "@storybook/react"; // Используем правильный тип
import StoreProvider from "app/providers/redux/storeProvider";
import { StateSchema } from "app/providers/redux/storeProvider/config/stateSchema";
import { loginReducer } from "../../../../../features/authByUsername/model/slice";
import { profileReducer } from "../../../../../entities/profile/model/slice";
import { ReducersList } from "shared/helpers/components/dynamicModuleLoaderWrapper";

const defaulAsyncReducers: ReducersList = {
   loginForm: loginReducer,
   profile: profileReducer,
};

export const StoreDecorator =
   (state: DeepPartial<StateSchema>, asyncReducers?: ReducersList) =>
   (StoryComponent: StoryFn) =>
      (
            <StoreProvider
               initialState={state}
               asyncReducers={{ ...defaulAsyncReducers, ...asyncReducers }}
            >
               <StoryComponent />
            </StoreProvider>
      );
