import { BrowserRouter } from "react-router-dom";
import "../styles/index.scss";
import { useTheme } from "./components/ui/theme/hook";
import { HomePage } from "./pages/homePage";

export const App = (): JSX.Element => {
  const { theme } = useTheme();
  return (
    <BrowserRouter>
      <div className={`app ${theme}`}>
        <HomePage />
      </div>{" "}
    </BrowserRouter>
  );
};
