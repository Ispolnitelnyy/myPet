import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "entities/user/model/types";
import { userActions } from "../../../../../entities/user/model/slice";
import { USER_LOCALSTORAGE_KEY } from "shared/constants/localstorage";
import { ThunkConfig } from "app/providers/redux/storeProvider/config/stateSchema";

interface LoginByUsernameProps {
   username: string;
   password: string;
}

export const loginByUsername = createAsyncThunk<
   User,
   LoginByUsernameProps,
   ThunkConfig<string>

   // User, // Тип данных, которые возвращает thunk
   // LoginByUsernameProps, // Тип аргументов thunk
   // ThunkConfig<string> // Типизация thunkAPI (состояние, dispatch, rejectValue)
>("login/loginByUsername", async (authData, thunkApi) => {
   try {
      const response = await thunkApi.extra.api.post<User>(
         // "http://localhost:8000/login",
         "/login",
         authData
      );
      if (!response.data) {
         throw new Error();
      }

      localStorage.setItem(
         USER_LOCALSTORAGE_KEY,
         JSON.stringify(response.data)
      );
      thunkApi.dispatch(userActions.setAuthData(response.data));
      // extra.navigate('/about') // теперь при отработке thunk можем выполнить редерект на /about

      return response.data;
   } catch (e) {
      console.log(e);
      return thunkApi.rejectWithValue("введены не корректные данные");
   }
});
