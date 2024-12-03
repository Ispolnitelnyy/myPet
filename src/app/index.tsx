import "./styles/index.scss";
import { useTheme } from "./components/widgets/themeSwicherButton/hook";
import { NavBar } from "./components/widgets/navBar";
import { AppRouter } from "./providers";
import SideBar from "./components/widgets/sideBar";
import { Suspense } from "react";

export const App = (): JSX.Element => {
   const { theme } = useTheme();
   return (
      <div className={`app ${theme}`}>
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
