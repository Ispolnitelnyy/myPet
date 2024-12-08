import { DeepPartial } from "./../../../../../../node_modules/@types/react-redux/node_modules/redux/index.d";
import { StateSchema } from "app/providers/redux/storeProvider/store/stateSchema";
import { getCounterValue } from ".";

describe("getCounterValue", () => {
   test("возвращает значение", () => {
      const state: DeepPartial<StateSchema> = {
         counter: { value: 10 },
      };
      expect(getCounterValue(state as StateSchema)).toEqual(10);
   });
});
