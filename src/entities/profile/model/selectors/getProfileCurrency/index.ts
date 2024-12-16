import { StateSchema } from "app/providers/redux/storeProvider/config/stateSchema";

export const getProfileCurrency = (state: StateSchema) =>
   state?.profile?.data?.currency || "";
