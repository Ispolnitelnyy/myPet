import { StateSchema } from "app/providers/redux/storeProvider/config/stateSchema";

export const getProfileAge = (state: StateSchema) =>
   state?.profile?.data?.age || "";
