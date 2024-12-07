import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from ".";
import { ThemeDecorator } from "shared/configs/storybook/decorators/themeDecorator";
import { ThemeStateEnums } from "app/providers/themeProvider/themeContext";
const meta = {
   title: "Shared/Modal",
   component: Modal,
   parameters: { layout: "centered" },
   tags: ["Modal component"],
   argTypes: {},
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ComponentModal: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.LIGHT)],
   args: {
      isOpen: true,
      children:
         "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid commodi consequatur eligendi impedit incidunt necessitatibus possimus quis saepe sunt totam.",
   },
};
export const ComponentModalDark: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.DARK)],
   args: {
      isOpen: true,
      children:
         "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid commodi consequatur eligendi impedit incidunt necessitatibus possimus quis saepe sunt totam.",
   },
};
