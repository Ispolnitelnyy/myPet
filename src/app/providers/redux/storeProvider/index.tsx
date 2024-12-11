import { Provider } from "react-redux";
import { createReduxStore } from "./config/store";
import { StateSchema } from "./config/stateSchema";
import { DeepPartial } from "../../../../../node_modules/@types/react-redux/node_modules/redux/index.d";

interface StoreProviderProps {
   children?: React.ReactNode;
   initialState?: DeepPartial<StateSchema>;
}

export const StoreProvider = (props: StoreProviderProps) => {
   const { children, initialState } = props;

   const store = createReduxStore(initialState as StateSchema);

   return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
