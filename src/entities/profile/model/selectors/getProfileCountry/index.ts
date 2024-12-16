import { StateSchema } from "app/providers/redux/storeProvider/config/stateSchema";

export const getProfileCountry = (state: StateSchema) =>
   state?.profile?.data?.country || "";
