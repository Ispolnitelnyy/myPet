import { Provider } from "react-redux";
import { createReduxStore } from "./store";
import { StateSchema } from "./store/stateSchema";

interface StoreProviderProps {
   children?: React.ReactNode;
   initialState?: StateSchema;
}

export const StoreProvider = (props: StoreProviderProps) => {
   const { children, initialState } = props;
   
   const store = createReduxStore(initialState);

   return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
