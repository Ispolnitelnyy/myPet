import type { Preview } from "@storybook/react";
// import { StoreDecorator } from "shared/configs/storybook/decorators/storeDecorator";
// import { RouterDecorator } from "shared/configs/storybook/decorators/routerDecorator";
// import { ThemeDecorator } from "shared/configs/storybook/decorators/themeDecorator";

export const preview: Preview = {
   parameters: {
      controls: {
         matchers: {
            color: /(background|color)$/i,
            date: /Date$/i,
         },
      },
   },
};
