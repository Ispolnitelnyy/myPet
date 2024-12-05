import type { Meta, StoryObj } from "@storybook/react";
import { ErrorBoundaryPage } from ".";
import { ThemeStateEnums } from "app/providers/themeProvider";
import { ThemeDecorator } from "app/components/shared/configs/storybook/decorators/themeDecorator";
import { RourerDecorator } from "app/components/shared/configs/storybook/decorators/routerDecorator";
const meta = {
   title: "Widgets/ErrorBoundaryPage",
   component: ErrorBoundaryPage,
   parameters: {},
   tags: ["ErrorBoundaryPage component"],
   argTypes: {},
} satisfies Meta<typeof ErrorBoundaryPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LightThemeErrorBoundaryPage: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.LIGHT)],
   args: {},
};
export const DarkThemeErrorBoundaryPage: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.DARK)],
   args: {},
};
