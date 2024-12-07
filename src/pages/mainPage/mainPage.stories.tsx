import type { Meta, StoryObj } from "@storybook/react";
import { MainPage } from ".";
import { ThemeStateEnums } from "app/providers/themeProvider";
import { ThemeDecorator } from "shared/configs/storybook/decorators/themeDecorator";
const meta = {
   title: "Pages/MainPage",
   component: MainPage,
   parameters: {},
   tags: ["MainPage component"],
   argTypes: {},
} satisfies Meta<typeof MainPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LightThemeMainPage: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.LIGHT)],
   args: {},
};
export const DarkThemeMainPage: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.DARK)],
   args: {},
};
