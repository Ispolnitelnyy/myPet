import { StateSchema } from "app/providers/redux/storeProvider/config/stateSchema";

export const getLoginPassword = (state: StateSchema) =>
   state?.loginForm?.password || "";
