import "../styles/index.scss";
import { Route, Routes, Link } from "react-router-dom";
import { Suspense } from "react";
import { AboutPageLazy, CounterPageLazy, MainPageLazy } from "./pages/react-lazy";
import { useTheme } from "./components/theme/hook";
import { classNames } from "./helpers/classNames";

export enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

export const App = (): JSX.Element => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={classNames("app", {}, [theme])}>
      <button onClick={toggleTheme}>toggle</button>
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
