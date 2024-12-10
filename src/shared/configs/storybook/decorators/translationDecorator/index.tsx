import { StoryFn } from "@storybook/react"; // Используем правильный тип
import { Suspense } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "shared/configs/i18n";
// TODO: создавался в 34 видосе с 40 минуты
export const TranslationDecorator = (StoryComponent: StoryFn) => (
   <I18nextProvider i18n={i18n}>
      <Suspense fallback="">
         <StoryComponent />
      </Suspense>
   </I18nextProvider>
);
