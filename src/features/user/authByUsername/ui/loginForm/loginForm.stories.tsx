import type { Meta, StoryObj } from "@storybook/react";
import { LoginForm } from ".";
import { ThemeDecorator } from "shared/configs/storybook/decorators/themeDecorator";
import { ThemeStateEnums } from "app/providers/themeProvider/themeContext";
import { RouterDecorator } from "shared/configs/storybook/decorators/routerDecorator";
const meta = {
   title: "Features/LoginForm",
   component: LoginForm,
   parameters: {},
   tags: ["LoginForm component"],
   argTypes: {},
   decorators: [RouterDecorator],

} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoginFormComponent: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.LIGHT)],
};
export const LoginFormComponentDark: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.DARK)],
};
