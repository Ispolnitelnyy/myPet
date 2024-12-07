import { StoryFn } from "@storybook/react"; // Используем правильный тип
import { BrowserRouter } from "react-router-dom";

export const RouterDecorator = (StoryComponent: StoryFn) => (
   <BrowserRouter>
      <StoryComponent />
   </BrowserRouter>
);
