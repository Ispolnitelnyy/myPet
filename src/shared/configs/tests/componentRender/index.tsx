import { render } from "@testing-library/react";
import { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom";
import i18n from "../../i18n/i18nForTests";
import StoreProvider from "app/providers/redux/storeProvider";
import { StateSchema } from "app/providers/redux/storeProvider/config/stateSchema";
import { DeepPartial } from "./../../../../../node_modules/@types/react-redux/node_modules/redux/index.d";

export interface ComponentRenderOptions {
   route?: string;
   initialState?: DeepPartial<StateSchema>;
}

export function ComponentRender(
   component: ReactNode,
   options: ComponentRenderOptions = {}
) {
   const { route = "/", initialState } = options;

   return render(
      <StoreProvider initialState={initialState}>
         <MemoryRouter initialEntries={[route]}>
            <I18nextProvider i18n={i18n}>{component}</I18nextProvider>
         </MemoryRouter>
      </StoreProvider>
   );
}
