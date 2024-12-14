import { StateSchema } from "app/providers/redux/storeProvider/config/stateSchema";
import { DeepPartial } from "react-redux/node_modules/redux";
import { getLoginError } from ".";

describe("getLoginErrorSelector.test", () => {
   test("should return error", () => {
      const state: DeepPartial<StateSchema> = {
         loginForm: {
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
