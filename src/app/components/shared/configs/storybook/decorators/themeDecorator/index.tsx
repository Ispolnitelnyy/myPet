import { StoryFn } from "@storybook/react"; // Используем правильный тип
import { ThemeStateEnums } from "app/providers/themeProvider";
import "app/styles/index.scss";

export const ThemeDecorator =
   (theme: ThemeStateEnums) => (StoryComponent: StoryFn) =>
      (
         <div className={`app ${theme}`}>
            <StoryComponent />
         </div>
      );
