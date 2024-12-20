import { StateSchema } from "app/providers/redux/storeProvider/config/stateSchema";
import { Country, Currency } from "shared/constants/common";

export const getProfileData = (state: StateSchema) =>
   state?.profile?.data || {
      name: "",
      lastname: "",
      age: 0,
      currency: Currency.RUB,
      country: Country.RUS,
      city: "",
      username: "",
      avatar: "",
   };
