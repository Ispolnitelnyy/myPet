import { StateSchema } from "app/providers/redux/storeProvider/config/stateSchema";

export const getProfileData = (state: StateSchema) =>
   state.profile?.data || {
      name: "",
      lastname: "",
      age: 0,
      currency: "",
      country: "",
      city: "",
      username: "",
      avatar: "",
   };
