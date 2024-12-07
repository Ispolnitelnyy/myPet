import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Button, SizesButtonEnums, ThemeButtonEnums } from ".";
// import "../../../../styles/index.scss"; // рабочий импорт
// import "app/styles/index.scss"; // рабочий импорт
import { ThemeDecorator } from "shared/configs/storybook/decorators/themeDecorator";
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

export const Clear: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.LIGHT)],
   args: {
      children: "Clear",
      theme: ThemeButtonEnums.CLEAR,
   },
};
export const ClearDark: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.DARK)],
   args: {
      children: "Clear",
      theme: ThemeButtonEnums.CLEAR,
   },
};

export const Outline: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.LIGHT)],
   args: {
      children: "Outline",
      theme: ThemeButtonEnums.OUTLINE,
   },
};
export const OutlineDark: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.DARK)],
   args: {
      children: "Outline",
      theme: ThemeButtonEnums.OUTLINE,
   },
};

export const M: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.DARK)],
   args: {
      children: "size M",
      theme: ThemeButtonEnums.OUTLINE,
      size: SizesButtonEnums.M,
   },
};
export const L: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.DARK)],
   args: {
      children: "size L",
      theme: ThemeButtonEnums.OUTLINE,
      size: SizesButtonEnums.L,
   },
};
export const XL: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.DARK)],
   args: {
      children: "size XL",
      theme: ThemeButtonEnums.OUTLINE,
      size: SizesButtonEnums.XL,
   },
};
export const XXL: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.DARK)],
   args: {
      children: "size XXL",
      theme: ThemeButtonEnums.OUTLINE,
      size: SizesButtonEnums.XXL,
   },
};

export const Background: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.LIGHT)],
   args: {
      children: "Background",
      theme: ThemeButtonEnums.BACKGROUND,
      square: false,
   },
};
export const BackgroundDark: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.DARK)],
   args: {
      children: "Background",
      theme: ThemeButtonEnums.BACKGROUND,
   },
};

export const BackgroundInverted: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.LIGHT)],
   args: {
      children: "Background Inverted",
      theme: ThemeButtonEnums.BACKGROUND_INVERTED,
      square: false,
   },
};
export const BackgroundInvertedDark: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.DARK)],
   args: {
      children: "Background Inverted",
      theme: ThemeButtonEnums.BACKGROUND_INVERTED,
      square: false,
   },
};

export const squareButtonSizeM: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.LIGHT)],
   args: {
      children: " ",
      theme: ThemeButtonEnums.BACKGROUND_INVERTED,
      size: SizesButtonEnums.M,
      square: true,
   },
};

export const squareButtonSizeL: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.LIGHT)],
   args: {
      children: " ",
      theme: ThemeButtonEnums.BACKGROUND_INVERTED,
      size: SizesButtonEnums.L,
      square: true,
   },
};

export const squareButtonSizeXL: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.LIGHT)],
   args: {
      children: " ",
      theme: ThemeButtonEnums.BACKGROUND_INVERTED,
      size: SizesButtonEnums.XL,
      square: true,
   },
};

export const squareButtonSizeXXL: Story = {
   decorators: [ThemeDecorator(ThemeStateEnums.LIGHT)],
   args: {
      children: " ",
      theme: ThemeButtonEnums.BACKGROUND_INVERTED,
      size: SizesButtonEnums.XXL,
      square: true,
   },
};
