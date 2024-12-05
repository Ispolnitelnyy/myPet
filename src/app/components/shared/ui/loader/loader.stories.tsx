import type { Meta, StoryObj } from "@storybook/react";
import { Loader } from ".";
import { ThemeStateEnums } from "app/providers/themeProvider";
import { ThemeDecorator } from "app/components/shared/configs/storybook/decorators/themeDecorator";
const meta = {
   title: "Shared/Loader",
   component: Loader,
   parameters: {layout: 'centered',},
   tags: ["Loader component"],
   argTypes: {},
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LightThemeLoader: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.LIGHT)],
   args: {},
};
export const DarkThemeLoader: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.DARK)],
   args: {},
};
