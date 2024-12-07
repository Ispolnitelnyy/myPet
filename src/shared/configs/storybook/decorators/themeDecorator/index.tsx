import { StoryFn } from "@storybook/react"; // Используем правильный тип
import ThemeProvider from "app/providers/themeProvider";
import { ThemeStateEnums } from "app/providers/themeProvider/themeContext";
import "app/styles/index.scss";

export const ThemeDecorator =
   (theme: ThemeStateEnums) => (StoryComponent: StoryFn) =>
      (
         <ThemeProvider initialTheme={theme}>
            <div className={`app ${theme}`}>
               <StoryComponent />
            </div>
         </ThemeProvider>
      );
