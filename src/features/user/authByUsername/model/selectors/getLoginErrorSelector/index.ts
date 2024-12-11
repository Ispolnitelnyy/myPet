import { StateSchema } from "app/providers/redux/storeProvider/config/stateSchema";

export const getLoginError = (state: StateSchema) => state?.loginForm?.error;
