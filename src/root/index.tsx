import { createRoot } from "react-dom/client";
import { App } from "../app";
import { ThemeProvider } from "app/providers";
const rootElement = document.getElementById("root") as HTMLElement;

const root = createRoot(rootElement);
root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
