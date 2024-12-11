import { StateSchema } from "app/providers/redux/storeProvider/config/stateSchema";

export const getUserAuthData = (state: StateSchema) => state.user.authData;
