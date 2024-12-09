import { DeepPartial } from "../../../../../../node_modules/@types/react-redux/node_modules/redux/index.d";
import { StateSchema } from "app/providers/redux/storeProvider/store/stateSchema";
import { getCounter } from ".";

describe("getCounter", () => {
   test("возвращает значение", () => {
      const state: DeepPartial<StateSchema> = {
         counter: { value: 10 },
      };
      expect(getCounter(state as StateSchema)).toEqual({ value: 10 });
   });
});
