
import { counterActions, counterReducer } from ".";
import { CounterSchema } from "../types";

describe("counterSlice", () => {
   test("возвращает значение +1", () => {
      const state: CounterSchema = { value: 10 };
      expect(counterReducer(state, counterActions.increment())).toEqual({
         value: 11,
      });
   });
   test("возвращает значение -1", () => {
      const state: CounterSchema = { value: 10 };
      expect(counterReducer(state, counterActions.decrement())).toEqual({
         value: 9,
      });
   });
   test("state = undefined", () => {
    expect(counterReducer(undefined, counterActions.increment())).toEqual({
       value: 1,
    });
 });
});
