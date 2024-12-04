import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Button, ThemeButtonEnums } from "./";

// Конфигурация Storybook для компонента Button
const meta = {
   title: "Shared/UI/Button", // Категория и имя компонента
   component: Button,
   parameters: {
      layout: "centered", // Центровка компонента в Canvas
   },
   tags: ["autodocs"], // Тег для автодокументации
   argTypes: {
      theme: {
         control: "select", // Добавляем селектор для выбора темы
         options: Object.values(ThemeButtonEnums), // Опции из перечисления ThemeButtonEnums
      },
      className: { control: "text" }, // Опциональный класс
   },
   args: { onClick: fn() }, // Шпион для отслеживания onClick
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Примеры историй для различных вариантов использования компонента
export const Default: Story = {
   args: {
      children: "Default Button",
   },
};

export const Clear: Story = {
   args: {
      children: "Clear Button",
      theme: ThemeButtonEnums.CLEAR, // Тема CLEAR
   },
};

export const WithCustomClass: Story = {
   args: {
      children: "Custom Class Button",
      className: "my-custom-class", // Пользовательский класс
   },
};
