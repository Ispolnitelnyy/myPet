import { StateSchema } from "app/providers/redux/storeProvider/config/stateSchema";

export const getLoginState = (state: StateSchema) => state?.loginForm;
