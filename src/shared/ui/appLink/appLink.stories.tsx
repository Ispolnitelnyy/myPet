import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { AppLink, AppLinkEnum } from ".";
import { ThemeDecorator } from "shared/configs/storybook/decorators/themeDecorator";
import { ThemeStateEnums } from "app/providers/themeProvider";
import { RouterDecorator } from "../../configs/storybook/decorators/routerDecorator";
const meta = {
   title: "Shared/AppLink",
   component: AppLink,
   parameters: {},
   tags: ["AppLink component"],
   argTypes: {
      theme: {
         control: "text",
         options: Object.values(AppLinkEnum),
      },
   },
   decorators: [RouterDecorator],
   args: { to: "/" },
} satisfies Meta<typeof AppLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AppLinkPrimary: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.LIGHT)],
   args: {
      children: "AppLink",
      theme: AppLinkEnum.PRIMARY,
   },
};
export const AppLinkPrimaryDark: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.DARK)],
   args: {
      children: "AppLink",
      theme: AppLinkEnum.PRIMARY,
   },
};

export const AppLinkSecondary: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.LIGHT)],
   args: {
      children: "AppLink",
      theme: AppLinkEnum.SECONDARY,
   },
};
export const AppLinkSecondaryDark: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.DARK)],
   args: {
      children: "AppLink",
      theme: AppLinkEnum.SECONDARY,
   },
};

export const AppLinkRed: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.LIGHT)],
   args: {
      children: "AppLink",
      theme: AppLinkEnum.RED,
   },
};
export const AppLinkRedDark: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.DARK)],
   args: {
      children: "AppLink",
      theme: AppLinkEnum.RED,
   },
};
