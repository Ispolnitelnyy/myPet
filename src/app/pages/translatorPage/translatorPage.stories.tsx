import type { Meta, StoryObj } from "@storybook/react";
import { TranslatorPage } from ".";
import { ThemeStateEnums } from "app/providers/themeProvider";
import { ThemeDecorator } from "app/components/shared/configs/storybook/decorators/themeDecorator";
const meta = {
   title: "Pages/TranslatorPage",
   component: TranslatorPage,
   parameters: {},
   tags: ["TranslatorPage component"],
   argTypes: {},
} satisfies Meta<typeof TranslatorPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LightThemeTranslatorPage: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.LIGHT)],
   args: {},
};
export const DarkThemeTranslatorPage: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.DARK)],
   args: {},
};
