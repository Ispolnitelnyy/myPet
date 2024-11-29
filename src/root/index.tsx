import { createRoot } from "react-dom/client";
import { App } from "../app";

const rootElement = document.getElementById("root") as HTMLElement;

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <>
      <App />
    </>
  );
} else {
  console.error("Root element not found");
}
