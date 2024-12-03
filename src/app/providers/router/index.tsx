import { routeConfig } from "app/components/shared/configs/routes";
import PageLoader from "app/components/widgets/pageLoader";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

export const AppRouter = () => {
   return (
      <Routes>
         {routeConfig.map(([AppRoute, { path, element }]) => (
            <Route
               key={AppRoute}
               path={path}
               element={
                  <div key={AppRoute} className="page-wrapper">
                     <Suspense fallback={<PageLoader />}>{element}</Suspense>
                  </div>
               }
            />
         ))}
      </Routes>
   );
};

export default AppRouter;
