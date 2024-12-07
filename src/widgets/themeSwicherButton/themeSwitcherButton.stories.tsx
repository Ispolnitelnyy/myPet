import type { Meta, StoryObj } from "@storybook/react";
import { ThemeSwicherButton } from ".";
import { ThemeStateEnums } from "app/providers/themeProvider";
import { ThemeDecorator } from "shared/configs/storybook/decorators/themeDecorator";
const meta = {
   title: "Widgets/ThemeSwicherButton",
   component: ThemeSwicherButton,
   parameters: {},
   tags: ["ThemeSwicherButton component"],
   argTypes: {},
} satisfies Meta<typeof ThemeSwicherButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LightThemeThemeSwicherButton: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.LIGHT)],
   args: {},
};
export const DarkThemeThemeSwicherButton: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.DARK)],
   args: {},
};
