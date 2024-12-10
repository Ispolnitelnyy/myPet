import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Input } from ".";
// import "../../../../styles/index.scss"; // рабочий импорт
// import "app/styles/index.scss"; // рабочий импорт
import { ThemeDecorator } from "shared/configs/storybook/decorators/themeDecorator";
import { ThemeStateEnums } from "app/providers/themeProvider/themeContext";
const meta = {
   title: "Shared/Input",
   component: Input,
   parameters: {},
   tags: ["Input component"],
   argTypes: {},
   args: { onClick: fn() },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const input: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.LIGHT)],
   args: {
      placeholder: "text",
      value: "test input value",
   },
};
export const inputDark: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.DARK)],
   args: {
      placeholder: "text",
      value: "test input value",
   },
};
