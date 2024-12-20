import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/redux/storeProvider/config/stateSchema";
import { Profile } from "../types";

export const fetchProfileData = createAsyncThunk<
   Profile,
   void,
   ThunkConfig<string>

   // Profile, // Тип данных, которые возвращает thunk
   // void, // Тип аргументов void так как мы ничего не передаем
   // ThunkConfig<string> // Типизация thunkAPI (состояние, dispatch, rejectValue)

   // _: void - тела запроса никакого не будет, так как это get запрос
>("profile/fetchProfileData", async (_, thunkApi) => {
   try {
      const response = await thunkApi.extra.api.get<Profile>("/profile");
      throw new Error();
   } catch (e) {
      console.log(e);
      return thunkApi.rejectWithValue("не удалось получить данные профиля");
   }
});
