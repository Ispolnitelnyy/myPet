import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Button, ThemeButtonEnums } from "./";
// import "../../../../styles/index.scss"; // рабочий импорт
// import "app/styles/index.scss"; // рабочий импорт
import { ThemeDecorator } from "app/components/shared/configs/storybook/decorators/themeDecorator";
import { ThemeStateEnums } from "app/providers/themeProvider";
const meta = {
   title: "Shared/Button",
   component: Button,
   parameters: {},
   tags: ["Button component"],
   argTypes: {
      theme: {
         control: "text",
         options: Object.values(ThemeButtonEnums),
      },
   },
   args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LightThemeButtonTypeClear: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.LIGHT)],
   args: {
      children: "Clear Button LightTheme",
      theme: ThemeButtonEnums.CLEAR,
   },
};
export const DarkThemeButtonTypeClear: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.DARK)],
   args: {
      children: "Clear Button DarkTheme",
      theme: ThemeButtonEnums.CLEAR,
   },
};

export const LightThemeButtonTypeOutline: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.LIGHT)],
   args: {
      children: "Outline Button LightTheme",
      theme: ThemeButtonEnums.OUTLINE,
   },
};
export const DarkThemeButtonTypeOutline: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.DARK)],
   args: {
      children: "Outline Button DarkTheme",
      theme: ThemeButtonEnums.OUTLINE,
   },
};
