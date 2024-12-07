import { useTheme } from "./providers/themeProvider/useTheme";
import { NavBar } from "../widgets/navBar";
import { AppRouter } from "./providers";
import SideBar from "../widgets/sideBar";
import { Suspense } from "react";
import { classNames } from "shared/helpers/classNames";

export const App = (): JSX.Element => {
   const { theme } = useTheme();

   return (
      <div className={classNames("app", {}, [theme])}>
         <Suspense fallback="">
            <NavBar />
            <div className="content-page">
               <SideBar />
               <AppRouter />
            </div>
         </Suspense>
      </div>
   );
};
