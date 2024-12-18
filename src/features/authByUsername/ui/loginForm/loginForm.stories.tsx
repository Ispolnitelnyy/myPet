import type { Meta, StoryObj } from "@storybook/react";
import { LoginForm } from ".";
import { ThemeDecorator } from "shared/configs/storybook/decorators/themeDecorator";
import { ThemeStateEnums } from "app/providers/themeProvider/themeContext";
import { RouterDecorator } from "shared/configs/storybook/decorators/routerDecorator";
import { StoreDecorator } from "../../../../shared/configs/storybook/decorators/storeDecorator";
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
   decorators: [
      ThemeDecorator(ThemeStateEnums.LIGHT),
      StoreDecorator({
         loginForm: {
            username: "username",
            password: "123",
         },
      }),
   ],
   args: {
      onSuccess: () => {
         return;
      },
   },
};
export const LoginFormComponentDark: Story = {
   decorators: [
      ThemeDecorator(ThemeStateEnums.DARK),
      StoreDecorator({
         loginForm: {
            username: "username",
            password: "123",
            error: "error",
         },
      }),
   ],
   args: {
      onSuccess: () => {
         return;
      },
   },
};
export const LoginFormLoadingDark: Story = {
   decorators: [
      ThemeDecorator(ThemeStateEnums.DARK),
      StoreDecorator({
         loginForm: {
            isLoading: true,
         },
      }),
   ],
   args: {
      onSuccess: () => {
         return;
      },
   },
};
