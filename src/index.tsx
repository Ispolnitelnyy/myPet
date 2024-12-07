import "app/styles/index.scss";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "app/providers/errorBoundary";
import { ThemeProvider } from "app/providers";
import { App } from "app";
import "shared/configs/i18n";

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
