import { StateSchema } from "app/providers/redux/storeProvider/store/stateSchema";

export const getCounter = (state: StateSchema) => state.counter;
