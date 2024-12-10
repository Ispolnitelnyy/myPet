import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/redux/storeProvider/store";
import axios from "axios";
import { User } from "entities/user/model/types";

interface LoginByUsernameProps {
   username: string;
   password: string;
}

export const loginByUsername = createAsyncThunk<
   //   User,
   //   LoginByUsernameProps,
   //   { rejectValue: string }

   User, // Тип данных, которые возвращает thunk
   LoginByUsernameProps, // Тип аргументов thunk
   ThunkConfig<string> // Типизация thunkAPI (состояние, dispatch, rejectValue)
>("login/loginByUsername", async (authData, thunkAPI) => {
   try {
      const response = await axios.post(
         "http://localhost:8000/login",
         authData
      );
      if (!response.data) {
         throw new Error();
      }
      return response.data;
   } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue("failed");
   }
});
