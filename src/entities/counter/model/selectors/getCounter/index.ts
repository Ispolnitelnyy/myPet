import { StateSchema } from "app/providers/redux/storeProvider/config/stateSchema";

export const getCounter = (state: StateSchema) => state.counter;
