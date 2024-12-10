import { useTheme } from "./providers/themeProvider/useTheme";
import { NavBar } from "../widgets/navBar";
import { AppRouter } from "./providers";
import SideBar from "../widgets/sideBar";
import { Suspense, useEffect } from "react";
import { classNames } from "shared/helpers/classNames";
import { useAppDispatch } from "./providers/redux/hooks";
import { userActions } from "entities/user/model/slice";

export const App = (): JSX.Element => {
   const { theme } = useTheme();
   const dispatch = useAppDispatch();
   useEffect(() => {
      dispatch(userActions.initAuthData());
   }, [dispatch]);

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
