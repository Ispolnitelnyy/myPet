import type { Meta, StoryObj } from "@storybook/react";
import { NavBar } from ".";
import { ThemeStateEnums } from "app/providers/themeProvider";
import { ThemeDecorator } from "app/components/shared/configs/storybook/decorators/themeDecorator";
import { RourerDecorator } from "app/components/shared/configs/storybook/decorators/routerDecorator";
const meta = {
   title: "Widgets/NavBar",
   component: NavBar,
   parameters: {},
   tags: ["NavBar component"],
   argTypes: {},
   decorators: [
      RourerDecorator,
   ],
} satisfies Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LightThemeNavBar: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.LIGHT)],
   args: {},
};
export const DarkThemeNavBar: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.DARK)],
   args: {},
};
