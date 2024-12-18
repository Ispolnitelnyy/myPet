import { StateSchema } from "app/providers/redux/storeProvider/config/stateSchema";
import { getLoginError } from ".";

describe("getLoginErrorSelector.test", () => {
   test("should return error", () => {
      const state: DeepPartial<StateSchema> = {
         loginForm: {
            username: 'test',
            password: 'test',
            isLoading: false,
            error: "error",
         },
      };
      expect(getLoginError(state as StateSchema)).toEqual("error");
   });
   test("should work with empty state", () => {
      const state: DeepPartial<StateSchema> = {};
      expect(getLoginError(state as StateSchema)).toEqual(undefined);
   });
});
