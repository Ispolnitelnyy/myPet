import "../styles/index.scss";
import { useTheme } from "./components/theme/hook";
import { HomePage } from "./pages/homePage";

export enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

export const App = (): JSX.Element => {
  const { theme } = useTheme();
  return (
    <div className={`app ${theme}`}>
      <HomePage />
    </div>
  );
};
