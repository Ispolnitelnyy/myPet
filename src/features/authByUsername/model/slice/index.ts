import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginSchema } from "../types";
import { loginByUsername } from "../services/loginByUsername";

const initialState: LoginSchema = {
   username: "",
   password: "",
   isLoading: false,
};

export const loginSlice = createSlice({
   name: "login",
   initialState,
   reducers: {
      setUsername: (state, action: PayloadAction<string>) => {
         state.username = action.payload;
      },
      setPassword: (state, action: PayloadAction<string>) => {
         state.password = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(loginByUsername.pending, (state, action) => {
            state.error = undefined;
            state.isLoading = true;
         })
         .addCase(loginByUsername.fulfilled, (state, action) => {
            state.isLoading = false;
         })
         .addCase(loginByUsername.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
         });
   },
});

// Создатели действий генерируются для каждой функции редуктора случая.
export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
