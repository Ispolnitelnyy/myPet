import "../styles/index.scss";
import { Route, Routes, Link, BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { AboutPageLazy, CounterPageLazy, MainPageLazy } from "../react-lazy";
import { ThemeButton } from "../../components/theme";
import { ThemeProvider } from "../../components/theme/provider";

export enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

export const HomePage = (): JSX.Element => {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider>
          <ThemeButton />
          <Link to={"/"}>страница меню</Link>
          <Link to={"/about"}>страница о нас</Link>
          <Link to={"/counter"}>страница счетчик</Link>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path={"/"} element={<MainPageLazy />} />
              <Route path={"/about"} element={<AboutPageLazy />} />
              <Route path={"/counter"} element={<CounterPageLazy />} />
            </Routes>
          </Suspense>{" "}
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
};
