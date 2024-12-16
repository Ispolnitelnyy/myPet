import { StateSchema } from "app/providers/redux/storeProvider/config/stateSchema";

export const getProfileUsername = (state: StateSchema) =>
   state?.profile?.data?.username || "";
