import { useDispatch } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/redux/storeProvider/config/store";
import axios from "axios";
import { User } from "entities/user/model/types";
import { userActions } from "../../../../../../entities/user/model/slice";
import { USER_LOCALSTORAGE_KEY } from "shared/constants/localstorage";

interface LoginByUsernameProps {
   username: string;
   password: string;
}

export const loginByUsername = createAsyncThunk<
   User,
   LoginByUsernameProps,
   { rejectValue: string }

   // User, // Тип данных, которые возвращает thunk
   // LoginByUsernameProps, // Тип аргументов thunk
   // ThunkConfig<string> // Типизация thunkAPI (состояние, dispatch, rejectValue)
>("login/loginByUsername", async (authData, thunkAPI) => {
   try {
      const response = await axios.post(
         "http://localhost:8000/login",
         authData
      );
      if (!response.data) {
         throw new Error();
      }

      localStorage.setItem(
         USER_LOCALSTORAGE_KEY,
         JSON.stringify(response.data)
      );
      thunkAPI.dispatch(userActions.setAuthData(response.data));

      return response.data;
   } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue("введены не корректные данные");
   }
});
