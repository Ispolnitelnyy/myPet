import { StateSchema } from "app/providers/redux/storeProvider/config/stateSchema";
import { DeepPartial } from "react-redux/node_modules/redux";
import { getLoginPassword } from ".";

describe("getLoginPasswordSelector.test", () => {
   test("should return value", () => {
      const state: DeepPartial<StateSchema> = {
         loginForm: {
            username: 'test',
            password: '123123',
            isLoading: false,
            error: undefined,
         },
      };
      expect(getLoginPassword(state as StateSchema)).toEqual("123123");
   });
   test("should work with empty state", () => {
      const state: DeepPartial<StateSchema> = {};
      expect(getLoginPassword(state as StateSchema)).toEqual("");
   });
});
