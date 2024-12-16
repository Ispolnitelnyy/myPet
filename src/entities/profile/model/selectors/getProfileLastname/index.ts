import { StateSchema } from "app/providers/redux/storeProvider/config/stateSchema";

export const getProfileLastname = (state: StateSchema) =>
   state?.profile?.data?.lastname || "";
