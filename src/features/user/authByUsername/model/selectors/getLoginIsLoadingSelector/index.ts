import { StateSchema } from "app/providers/redux/storeProvider/config/stateSchema";

export const getLoginIsLoading = (state: StateSchema) =>
   state?.loginForm?.isLoading || false;
