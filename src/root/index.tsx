import { createRoot } from "react-dom/client";
import { App } from "../app";
import { ThemeProvider } from "app/providers";
import ErrorBoundary from "app/providers/errorBoundary";
import "app/components/shared/configs/i18n";
import { BrowserRouter } from "react-router-dom";
const rootElement = document.getElementById("root") as HTMLElement;

const root = createRoot(rootElement);
root.render(
   <BrowserRouter>
      <ErrorBoundary>
         <ThemeProvider>
            <App />
         </ThemeProvider>
      </ErrorBoundary>
   </BrowserRouter>
);
