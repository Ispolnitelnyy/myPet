import { StateSchema } from "app/providers/redux/storeProvider/config/stateSchema";
import { getLoginState } from ".";

describe("getLoginState.test", () => {
   test("should return value", () => {
      const state: DeepPartial<StateSchema> = {
         loginForm: {
            username: "123123",
            error: undefined,
            isLoading: false,
            password: "123123",
         },
      };
      expect(getLoginState(state as StateSchema)).toEqual({
         username: "123123",
         error: undefined,
         isLoading: false,
         password: "123123",
      });
   });
});
