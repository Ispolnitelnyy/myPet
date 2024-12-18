import { StateSchema } from "app/providers/redux/storeProvider/config/stateSchema";
import { getLoginIsLoading } from ".";

describe("getLoginIsLoadingSelector.test", () => {
   test("should return true", () => {
      const state: DeepPartial<StateSchema> = {
         loginForm: {
            username: "",
            password: "",
            isLoading: true,
            error: undefined,
         },
      };
      expect(getLoginIsLoading(state as StateSchema)).toEqual(true);
   });
   test("should work with empty state", () => {
      const state: DeepPartial<StateSchema> = {};
      expect(getLoginIsLoading(state as StateSchema)).toEqual(false);
   });
});
