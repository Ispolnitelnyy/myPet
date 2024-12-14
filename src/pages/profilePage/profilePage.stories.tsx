import type { Meta, StoryObj } from "@storybook/react";
import { ProfilePage } from ".";
import { ThemeDecorator } from "shared/configs/storybook/decorators/themeDecorator";
import { ThemeStateEnums } from "app/providers/themeProvider/themeContext";
import { StoreDecorator } from "shared/configs/storybook/decorators/storeDecorator";
const meta = {
   title: "Pages/ProfilePage",
   component: ProfilePage,
   parameters: {},
   tags: ["ProfilePage component"],
   argTypes: {},
} satisfies Meta<typeof ProfilePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LightThemeProfilePage: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.LIGHT), StoreDecorator({})],
   args: {},
};
export const DarkThemeProfilePage: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.DARK), StoreDecorator({})],
   args: {},
};
