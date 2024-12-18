import type { Meta, StoryObj } from "@storybook/react";
import { ProfilePage } from ".";
import { ThemeDecorator } from "shared/configs/storybook/decorators/themeDecorator";
import { ThemeStateEnums } from "app/providers/themeProvider/themeContext";
import { StoreDecorator } from "../../shared/configs/storybook/decorators/storeDecorator";
import { RouterDecorator } from "shared/configs/storybook/decorators/routerDecorator";
// import { Country, Currency } from "shared/constants/common";
const meta = {
   title: "Pages/ProfilePage",
   component: ProfilePage,
   parameters: {},
   tags: ["ProfilePage component"],
   argTypes: {},
   decorators: [RouterDecorator],
} satisfies Meta<typeof ProfilePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LightThemeProfilePage: Story = {
   decorators: [
      ThemeDecorator(ThemeStateEnums.LIGHT),
      StoreDecorator({
         // profile: {
         //    data: {
         //       name: "name",
         //       lastname: "lastname",
         //       age: 0,
         //       currency: Currency.RUB,
         //       country: Country.RUS,
         //       city: "string",
         //       username: "username",
         //       avatar: "avatar",
         //    },
         //    isLoading: false,
         //    error: undefined,
         //    readonly: true,
         // },
      }),
   ],
   args: {},
};
export const DarkThemeProfilePage: Story = {
   decorators: [
      ThemeDecorator(ThemeStateEnums.DARK),
      StoreDecorator({
         // profile: {
         //    data: {
         //       name: "name",
         //       lastname: "lastname",
         //       age: 0,
         //       currency: Currency.RUB,
         //       country: Country.RUS,
         //       city: "string",
         //       username: "username",
         //       avatar: "avatar",
         //    },
         //    isLoading: false,
         //    error: undefined,
         //    readonly: true,
         // },
      }),
   ],
   args: {},
};
