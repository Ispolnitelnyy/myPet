import { BrowserRouter } from "react-router-dom";
import "./styles/index.scss";
import { useTheme } from "./components/shared/ui/themeButton/hook";
import { HomePage } from "./pages/homePage";

export const App = (): JSX.Element => {
  const { theme } = useTheme();
  return (
    <BrowserRouter>
      <div className={`app ${theme}`}>
        <HomePage />
      </div>
    </BrowserRouter>
  );
};
