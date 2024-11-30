import { routeConfig } from "app/components/shared/configs/routes";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

export const AppRouter = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {routeConfig.map(([AppRoute, { path, element }]) => (
            <Route key={AppRoute} path={path} element={element} />
          ))}
        </Routes>
      </Suspense>
    </>
  );
};

export default AppRouter;
