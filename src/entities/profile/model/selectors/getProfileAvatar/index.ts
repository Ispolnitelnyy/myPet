import { StateSchema } from "app/providers/redux/storeProvider/config/stateSchema";

export const getProfileAvatar = (state: StateSchema) =>
   state?.profile?.data?.avatar || "";
