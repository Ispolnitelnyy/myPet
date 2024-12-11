import { StateSchema } from "app/providers/redux/storeProvider/config/stateSchema";

export const getLoginUsername = (state: StateSchema) =>
   state?.loginForm?.username || "";
