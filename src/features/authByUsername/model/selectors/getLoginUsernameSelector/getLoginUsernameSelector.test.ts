import { StateSchema } from "app/providers/redux/storeProvider/config/stateSchema";
import { getLoginUsername } from ".";

describe("getLoginUsernameSelector.test", () => {
   test("should return value", () => {
      const state: DeepPartial<StateSchema> = {
         loginForm: {
            username: '123123',
            password: 'test',
            isLoading: false,
            error: undefined,
         },
      };
      expect(getLoginUsername(state as StateSchema)).toEqual("123123");
   });
   test("should work with empty state", () => {
      const state: DeepPartial<StateSchema> = {};
      expect(getLoginUsername(state as StateSchema)).toEqual("");
   });
});
