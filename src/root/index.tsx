/* eslint-disable react/react-in-jsx-scope */
import { createRoot } from "react-dom/client";
import { App } from "../app";
import { ThemeProvider } from "app/providers";

// import "app/components/shared/configs/routes/i18n";
const rootElement = document.getElementById("root") as HTMLElement;

const root = createRoot(rootElement);
root.render(
   <ThemeProvider>
      <App />
   </ThemeProvider>
);
