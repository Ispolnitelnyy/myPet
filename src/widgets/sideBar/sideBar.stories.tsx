import type { Meta, StoryObj } from "@storybook/react";
import { SideBar } from ".";
import { ThemeStateEnums } from "app/providers/themeProvider";
import { ThemeDecorator } from "shared/configs/storybook/decorators/themeDecorator";
import { RouterDecorator } from "shared/configs/storybook/decorators/routerDecorator";
const meta = {
   title: "Widgets/SideBar",
   component: SideBar,
   parameters: {},
   tags: ["SideBar component"],
   argTypes: {},
   decorators: [RouterDecorator],
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
