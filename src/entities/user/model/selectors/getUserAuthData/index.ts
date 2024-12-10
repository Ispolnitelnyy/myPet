import { StateSchema } from "app/providers/redux/storeProvider/store/stateSchema";

export const getUserAuthData = (state: StateSchema) => state.user.authData;
