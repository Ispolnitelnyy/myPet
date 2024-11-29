import { Route, Routes, Link } from "react-router-dom";
import { Suspense } from "react";
import { AboutPageLazy, CounterPageLazy, MainPageLazy } from "../react-lazy";
import { ThemeButton } from "../../components/ui/theme";
import { LinkButton, LinkButtonsEnum, LinkRefsEnum } from "../../components/ui/linkButton";
import { NavBar } from "../../components/widgets/navBar";

export const HomePage = (): JSX.Element => {
  return (
    <>
      <NavBar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={"/"} element={<MainPageLazy />} />
          <Route path={"/about"} element={<AboutPageLazy />} />
          <Route path={"/counter"} element={<CounterPageLazy />} />
        </Routes>
      </Suspense>
    </>
  );
};
