import { createSlice } from "@reduxjs/toolkit";
import { ProfileSchema } from "../types";

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
});

// Создатели действий генерируются для каждой функции редуктора случая.
export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
