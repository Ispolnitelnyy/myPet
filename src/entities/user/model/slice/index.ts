import { createSlice } from "@reduxjs/toolkit";
import { UserSchema } from "../types";

const initialState: UserSchema = {};

export const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {},
});

// Создатели действий генерируются для каждой функции редуктора случая.
export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
