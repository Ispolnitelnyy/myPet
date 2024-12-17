import { AsyncThunkAction } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/redux/storeProvider/config/stateSchema";
import axios, { AxiosStatic } from "axios";

type ActionCreatorType<Return, Arg, RejectedValue> = (
   arg: Arg
) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>;

jest.mock("axios");
const mockedAxios: jest.MockedFunctionDeep<AxiosStatic> = jest.mocked(axios, {
   shallow: false,
});

export class TestAsyncThunk<Return, Arg, RejectedValue> {
   dispatch: jest.MockedFn<any>;

   getState: () => StateSchema;

   // actionCreator это сам asyncThunk
   actionCreator: ActionCreatorType<Return, Arg, RejectedValue>;

   api: jest.MockedFunctionDeep<AxiosStatic>;
   navigate: jest.MockedFn<any>;

   constructor(actionCreator: ActionCreatorType<Return, Arg, RejectedValue>) {
      this.actionCreator = actionCreator;
      this.dispatch = jest.fn();
      this.getState = jest.fn();
      this.api = mockedAxios;
      this.navigate = jest.fn();
   }

   // функция с помощью которой мы будем вызывать асинхронный action
   async callThunk(arg: Arg) {
      const action = this.actionCreator(arg);
      const result = await action(this.dispatch, this.getState, {
         api: this.api,
         navigate: this.navigate,
      });

      return result;
   }
}
