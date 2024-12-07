import type { Meta, StoryObj } from "@storybook/react";
import { SideBar } from "./";
import { ThemeStateEnums } from "app/providers/themeProvider";
import { ThemeDecorator } from "app/components/shared/configs/storybook/decorators/themeDecorator";
import { RourerDecorator } from "app/components/shared/configs/storybook/decorators/routerDecorator";
const meta = {
   title: "Widgets/SideBar",
   component: SideBar,
   parameters: {},
   tags: ["SideBar component"],
   argTypes: {},
   decorators: [
      RourerDecorator,
   ],
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
