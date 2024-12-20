import { StateSchema } from "app/providers/redux/storeProvider/config/stateSchema";
import { getCounterValue } from ".";

describe("getCounterValue", () => {
   test("возвращает значение", () => {
      const state: DeepPartial<StateSchema> = {
         counter: { value: 10 },
      };
      expect(getCounterValue(state as StateSchema)).toEqual(10);
   });
});
