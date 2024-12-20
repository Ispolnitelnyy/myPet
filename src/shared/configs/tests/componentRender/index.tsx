import { render } from "@testing-library/react";
import { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom";
import i18n from "../../i18n/i18nForTests";
import StoreProvider from "app/providers/redux/storeProvider";
import { StateSchema } from "app/providers/redux/storeProvider/config/stateSchema";

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
      <MemoryRouter initialEntries={[route]}>
         <StoreProvider initialState={initialState}>
            <I18nextProvider i18n={i18n}>{component}</I18nextProvider>
         </StoreProvider>
      </MemoryRouter>
   );
}
