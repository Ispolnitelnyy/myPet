import { StateSchema } from "app/providers/redux/storeProvider/config/stateSchema";

export const getProfileFirsname = (state: StateSchema) =>
   state?.profile?.data?.name || "";
