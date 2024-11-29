import { createRoot } from "react-dom/client";
import "../styles/index.scss";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { Suspense } from "react";
import { AboutPageLazy, CounterPageLazy, MainPageLazy } from "../pages/react-lazy";

const App = (): JSX.Element => {
  return (
    <div className="app">
      <Link to={"/"}>страница меню</Link>
      <Link to={"/about"}>страница о нас</Link>
      <Link to={"/counter"}>страница счетчик</Link>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={"/"} element={<MainPageLazy />} />
          <Route path={"/about"} element={<AboutPageLazy />} />
          <Route path={"/counter"} element={<CounterPageLazy />} />
        </Routes>
      </Suspense>
    </div>
  );
};

const rootElement = document.getElementById("root") as HTMLElement;

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </>
  );
} else {
  console.error("Root element not found");
}
