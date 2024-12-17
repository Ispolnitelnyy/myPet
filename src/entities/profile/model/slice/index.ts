import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile, ProfileSchema } from "../types";
import { fetchProfileData } from "../services";

const initialState: ProfileSchema = {
   isLoading: false,
   readonly: true,
   // data: undefined,
   // error: undefined
};

export const profileSlice = createSlice({
   name: "profile",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchProfileData.pending, (state, action) => {
            state.error = undefined;
            state.isLoading = true;
         })
         .addCase(
            fetchProfileData.fulfilled,
            (state, action: PayloadAction<Profile>) => {
               //Profile - по тому как бэк возвращает данные о пользователе
               state.isLoading = false;
               state.data = action.payload; // сохраняем в state данные полученные с бэка
               // state.data.avatar = action.payload.avatar
               //    ? action.payload.avatar
               //    : `https://raw.githubusercontent.com/Ispolnitelnyy/myPet/ca20b5778efb063099a8ca18a112cf89d79fea7e/public/assets/icons/user-32-32.png`;
            }
         )
         .addCase(fetchProfileData.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
         });
   },
});

// Создатели действий генерируются для каждой функции редуктора случая.
export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
