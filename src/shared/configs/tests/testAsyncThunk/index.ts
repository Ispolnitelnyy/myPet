import { AsyncThunkAction } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/redux/storeProvider/config/stateSchema";

type ActionCreatorType<Return, Arg, RejectedValue> = (
   arg: Arg
) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>;

export class TestAsyncThunk<Return, Arg, RejectedValue> {
   dispatch: jest.MockedFn<any>;

   getState: () => StateSchema;

   // actionCreator это сам asyncThunk
   actionCreator: ActionCreatorType<Return, Arg, RejectedValue>;

   constructor(actionCreator: ActionCreatorType<Return, Arg, RejectedValue>) {
      this.actionCreator = actionCreator;
      this.dispatch = jest.fn();
      this.getState = jest.fn();
   }

   // функция с помощью которой мы будем вызывать асинхронный action
   async callThunk(arg: Arg) {
      const action = this.actionCreator(arg);
      const result = await action(this.dispatch, this.getState, undefined);

      return result;
   }
}
