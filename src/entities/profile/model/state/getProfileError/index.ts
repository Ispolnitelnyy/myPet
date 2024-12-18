import { StateSchema } from "app/providers/redux/storeProvider/config/stateSchema";

export const getProfileError = (state: StateSchema) =>
   state.profile?.error || "";
