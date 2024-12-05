import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { AppLink, AppLinkEnum } from ".";
import { ThemeDecorator } from "app/components/shared/configs/storybook/decorators/themeDecorator";
import { ThemeStateEnums } from "app/providers/themeProvider";
import { RourerDecorator } from "../../configs/storybook/decorators/routerDecorator";
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
   decorators: [RourerDecorator],
   args: { to: "/" },
} satisfies Meta<typeof AppLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LightThemeAppLinkTypePrimary: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.LIGHT)],
   args: {
      children: "AppLink Primary LightTheme",
      theme: AppLinkEnum.PRIMARY,
   },
};
export const DarkThemeAppLinkTypePrimary: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.DARK)],
   args: {
      children: "AppLink Primary DarkTheme",
      theme: AppLinkEnum.PRIMARY,
   },
};

export const LightThemeAppLinkTypeSecondary: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.LIGHT)],
   args: {
      children: "AppLink Secondary LightTheme",
      theme: AppLinkEnum.SECONDARY,
   },
};
export const DarkThemeAppLinkTypeSecondary: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.DARK)],
   args: {
      children: "AppLink Secondary DarkTheme",
      theme: AppLinkEnum.SECONDARY,
   },
};

export const LightThemeAppLinkTypeRed: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.LIGHT)],
   args: {
      children: "AppLink Red LightTheme",
      theme: AppLinkEnum.RED,
   },
};
export const DarkThemeAppLinkTypeRed: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.DARK)],
   args: {
      children: "AppLink Red DarkTheme",
      theme: AppLinkEnum.RED,
   },
};
