import { StateSchema } from "app/providers/redux/storeProvider/config/stateSchema";
import { DeepPartial } from "../../../../../../../node_modules/@types/react-redux/node_modules/redux/index.d";
import { getLoginPassword } from ".";

describe("getLoginPasswordSelector.test", () => {
   test("should return value", () => {
      const state: DeepPartial<StateSchema> = {
         loginForm: {
            password: "123123",
         },
      };
      expect(getLoginPassword(state as StateSchema)).toEqual("123123");
   });
   test("should work with empty state", () => {
      const state: DeepPartial<StateSchema> = {};
      expect(getLoginPassword(state as StateSchema)).toEqual("");
   });
});
