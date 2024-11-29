import { createRoot } from "react-dom/client";
import { App } from "../app";
import { ThemeProvider } from "app/providers";
const rootElement = document.getElementById("root") as HTMLElement;

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </>
  );
} else {
  console.error("---!---!-->Root element not found<--!---!---");
}
