import type { Meta, StoryObj } from "@storybook/react";
import { CounterPage } from ".";
import { ThemeStateEnums } from "app/providers/themeProvider";
import { ThemeDecorator } from "app/components/shared/configs/storybook/decorators/themeDecorator";
const meta = {
   title: "Pages/CounterPage",
   component: CounterPage,
   parameters: {},
   tags: ["CounterPage component"],
   argTypes: {},
} satisfies Meta<typeof CounterPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LightThemeCounterPage: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.LIGHT)],
   args: {},
};
export const DarkThemeCounterPage: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.DARK)],
   args: {},
};
