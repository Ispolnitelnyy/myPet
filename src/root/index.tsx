import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "../app/components/theme/provider";
import { App } from "../app";

const rootElement = document.getElementById("root") as HTMLElement;

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <>
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
} else {
  console.error("Root element not found");
}
