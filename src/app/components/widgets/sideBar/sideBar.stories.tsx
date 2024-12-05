import type { Meta, StoryObj } from "@storybook/react";
import { SideBar } from "./";
import { ThemeStateEnums } from "app/providers/themeProvider";
import { ThemeDecorator } from "app/components/shared/configs/storybook/decorators/themeDecorator";
const meta = {
   title: "Widgets/SideBar",
   component: SideBar,
   parameters: {},
   tags: ["SideBar component"],
   argTypes: {},
} satisfies Meta<typeof SideBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LightThemeSideBar: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.LIGHT)],
   args: {},
};
export const DarkThemeSideBar: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.DARK)],
   args: {},
};
