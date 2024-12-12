import { StateSchema } from "app/providers/redux/storeProvider/config/stateSchema";
import { DeepPartial } from "../../../../../../../node_modules/@types/react-redux/node_modules/redux/index.d";
import { getLoginIsLoading } from ".";

describe("getLoginIsLoadingSelector.test", () => {
   test("should return true", () => {
      const state: DeepPartial<StateSchema> = {
         loginForm: {
            isLoading: true,
         },
      };
      expect(getLoginIsLoading(state as StateSchema)).toEqual(true);
   });
   test("should work with empty state", () => {
      const state: DeepPartial<StateSchema> = {};
      expect(getLoginIsLoading(state as StateSchema)).toEqual(false);
   });
});
