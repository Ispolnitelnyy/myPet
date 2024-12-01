import { BrowserRouter } from "react-router-dom";
import "./styles/index.scss";
import { useTheme } from "./components/widgets/themeSwicher/hook";
import { NavBar } from "./components/widgets/navBar";
import { AppRouter } from "./providers";
import SideBar from "./components/widgets/sideBar";

export const App = (): JSX.Element => {
  const { theme } = useTheme();
  return (
    <BrowserRouter>
      <div className={`app ${theme}`}>
        <NavBar />
        <div className="content-page">
          <SideBar />
          <AppRouter />
        </div>
      </div>
    </BrowserRouter>
  );
};
