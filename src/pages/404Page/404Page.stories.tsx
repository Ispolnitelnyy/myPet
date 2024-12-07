import type { Meta, StoryObj } from "@storybook/react";
import { NotFoundPage } from ".";
import { ThemeDecorator } from "shared/configs/storybook/decorators/themeDecorator";
import { ThemeStateEnums } from "app/providers/themeProvider/themeContext";
const meta = {
   title: "Pages/NotFoundPage",
   component: NotFoundPage,
   parameters: {},
   tags: ["NotFoundPage component"],
   argTypes: {},
} satisfies Meta<typeof NotFoundPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LightThemeNotFoundPage: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.LIGHT)],
   args: {},
};
export const DarkThemeNotFoundPage: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.DARK)],
   args: {},
};
