import "../styles/index.scss";
import { Route, Routes, Link } from "react-router-dom";
import { Suspense, useContext } from "react";
import { AboutPageLazy, CounterPageLazy, MainPageLazy } from "./pages/react-lazy";
import { useTheme } from "./components/theme/hook";

export enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

export const App = (): JSX.Element => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={`app ${theme}`}>
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
