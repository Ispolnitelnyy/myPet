import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { AboutPageLazy, CounterPageLazy, MainPageLazy } from "../react-lazy";
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
