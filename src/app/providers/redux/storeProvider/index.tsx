import { Provider } from "react-redux";
import { createReduxStore } from "./config/store";
import { StateSchema } from "./config/stateSchema";
import { DeepPartial } from "../../../../../node_modules/@types/react-redux/node_modules/redux/index.d";
import { ReducersMapObject } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

interface StoreProviderProps {
   children?: React.ReactNode;
   initialState?: DeepPartial<StateSchema>;
   asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

export const StoreProvider = (props: StoreProviderProps) => {
   const { children, initialState, asyncReducers } = props;
   const navigate = useNavigate();

   const store = createReduxStore(
      initialState as StateSchema,
      asyncReducers as ReducersMapObject<StateSchema>,
      navigate
   );

   return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
