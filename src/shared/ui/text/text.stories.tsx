import type { Meta, StoryObj } from "@storybook/react";
import { Text, TextThemeEnums } from ".";
// import "../../../../styles/index.scss"; // рабочий импорт
// import "app/styles/index.scss"; // рабочий импорт
import { ThemeDecorator } from "shared/configs/storybook/decorators/themeDecorator";
import { ThemeStateEnums } from "app/providers/themeProvider/themeContext";
const meta = {
   title: "Shared/Text",
   component: Text,
   parameters: {},
   tags: ["Text component"],
   argTypes: {},
   args: {},
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const title: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.LIGHT)],
   args: {
      title: "test title light theme",
   },
};
export const titleDark: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.DARK)],
   args: {
      title: "test title dark theme",
   },
};

export const text: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.LIGHT)],
   args: {
      text: "test text light theme",
   },
};
export const textDark: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.DARK)],
   args: {
      text: "test text dark theme",
   },
};
export const titleText: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.LIGHT)],
   args: {
      title: "test title light theme",
      text: "test text light theme",
   },
};
export const titleTextDark: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.DARK)],
   args: {
      title: "test title dark theme",
      text: "test text dark theme",
   },
};

export const titleTextRed: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.LIGHT)],
   args: {
      title: "test red title light theme",
      text: "test red text light theme",
      theme: TextThemeEnums.ERROR,
   },
};
export const titleTextRedDark: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.DARK)],
   args: {
      title: "test red title dark theme",
      text: "test red text dark theme",
      theme: TextThemeEnums.ERROR,
   },
};
