import type { Meta, StoryObj } from "@storybook/react";
import { NavBar } from ".";
import { ThemeDecorator } from "shared/configs/storybook/decorators/themeDecorator";
import { RouterDecorator } from "shared/configs/storybook/decorators/routerDecorator";
import { ThemeStateEnums } from "app/providers/themeProvider/themeContext";
import { StoreDecorator } from "shared/configs/storybook/decorators/storeDecorator";
const meta = {
   title: "Widgets/NavBar",
   component: NavBar,
   parameters: {},
   tags: ["NavBar component"],
   argTypes: {},
   decorators: [RouterDecorator],
} satisfies Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LightThemeNavBar: Story = {
   decorators: [
      ThemeDecorator(ThemeStateEnums.LIGHT),
      StoreDecorator({
         loginForm: { username: "", password: "", isLoading: true },
      }),
   ],
   args: {},
};
export const DarkThemeNavBar: Story = {
   decorators: [
      ThemeDecorator(ThemeStateEnums.DARK),
      StoreDecorator({
         loginForm: { username: "", password: "", isLoading: true },
      }),
   ],
   args: {},
};
