import { createRoot } from "react-dom/client";
import { Counter } from "../counter";
import "./index.scss";

const rootElement = document.getElementById("root") as HTMLElement;

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <div className="app">
      <Counter />
    </div>
  );
} else {
  console.error("Root element not found");
}
