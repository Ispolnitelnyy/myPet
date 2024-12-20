import { StateSchema } from "app/providers/redux/storeProvider/config/stateSchema";
import { getCounter } from ".";

describe("getCounter", () => {
   test("возвращает значение", () => {
      const state: DeepPartial<StateSchema> = {
         counter: { value: 10 },
      };
      expect(getCounter(state as StateSchema)).toEqual({ value: 10 });
   });
});
