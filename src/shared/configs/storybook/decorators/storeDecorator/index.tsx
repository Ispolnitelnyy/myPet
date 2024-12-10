import { StoryFn } from "@storybook/react"; // Используем правильный тип
import StoreProvider from "app/providers/redux/storeProvider";
import { StateSchema } from "app/providers/redux/storeProvider/store/stateSchema";
import { DeepPartial } from "../../../../../../node_modules/@types/react-redux/node_modules/redux/index.d";

export const StoreDecorator =
   (state: DeepPartial<StateSchema>) => (StoryComponent: StoryFn) =>
      (
         <StoreProvider initialState={state}>
            <StoryComponent />
         </StoreProvider>
      );
