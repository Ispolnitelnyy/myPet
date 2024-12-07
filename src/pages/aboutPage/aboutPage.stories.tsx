import type { Meta, StoryObj } from "@storybook/react";
import { AboutPage } from ".";
import { ThemeStateEnums } from "app/providers/themeProvider";
import { ThemeDecorator } from "shared/configs/storybook/decorators/themeDecorator";
const meta = {
   title: "Pages/AboutPage",
   component: AboutPage,
   parameters: {},
   tags: ["AboutPage component"],
   argTypes: {},
} satisfies Meta<typeof AboutPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LightThemeAboutPage: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.LIGHT)],
   args: {},
};
export const DarkThemeAboutPage: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.DARK)],
   args: {},
};
