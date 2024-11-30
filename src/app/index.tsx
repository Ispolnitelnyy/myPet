import { BrowserRouter } from "react-router-dom";
import "./styles/index.scss";
import { useTheme } from "./components/shared/ui/themeSwicherButton/hook";
import { NavBar } from "./components/widgets/navBar";
import { AppRouter } from "./providers";

export const App = (): JSX.Element => {
  const { theme } = useTheme();
  return (
    <BrowserRouter>
      <div className={`app ${theme}`}>
        <NavBar />
        <AppRouter />
      </div>
    </BrowserRouter>
  );
};
