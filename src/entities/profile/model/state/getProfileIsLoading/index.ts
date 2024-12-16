import { StateSchema } from "app/providers/redux/storeProvider/config/stateSchema";

export const getProfileIsLoading = (state: StateSchema) =>
   state.profile?.isLoading;
