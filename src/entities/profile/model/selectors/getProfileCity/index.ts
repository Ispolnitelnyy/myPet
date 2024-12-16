import { StateSchema } from "app/providers/redux/storeProvider/config/stateSchema";

export const getProfileCity = (state: StateSchema) =>
   state?.profile?.data?.city || "";
