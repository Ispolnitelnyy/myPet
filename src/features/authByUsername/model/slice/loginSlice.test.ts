import { loginActions, loginReducer } from ".";
import { loginByUsername } from "../services/loginByUsername";
import { LoginSchema } from "../types";

describe("loginSlice.test", () => {
   test("test set username", () => {
      const state: DeepPartial<LoginSchema> = { username: "123" };
      expect(
         loginReducer(state as LoginSchema, loginActions.setUsername("123123"))
      ).toEqual({ username: "123123" });
   });

   test("test set password", () => {
      const state: DeepPartial<LoginSchema> = { password: "123" };
      expect(
         loginReducer(state as LoginSchema, loginActions.setPassword("123123"))
      ).toEqual({ password: "123123" });
   });

   test("test pending", () => {
      const state: DeepPartial<LoginSchema> = {
         isLoading: false,
         error: "Some error",
      };
      expect(
         loginReducer(
            state as LoginSchema,
            loginByUsername.pending("", { username: "test", password: "test" })
         )
      ).toEqual({ isLoading: true, error: undefined });
   });

   test("test fulfilled", () => {
      const state: DeepPartial<LoginSchema> = { isLoading: true };
      const payload = { id: "1", username: "test" };
      expect(
         loginReducer(
            state as LoginSchema,
            loginByUsername.fulfilled(payload, "", {
               username: "test",
               password: "test",
            })
         )
      ).toEqual({ isLoading: false });
   });

   test("test rejected", () => {
      const state: DeepPartial<LoginSchema> = { isLoading: true };
      const errorPayload = "введены не корректные данные";
      expect(
         loginReducer(
            state as LoginSchema,
            loginByUsername.rejected(
               { name: "Error", message: errorPayload },
               "",
               { username: "test", password: "test" }
            )
         )
      ).toEqual({ isLoading: false, error: state.error });
   });
});
