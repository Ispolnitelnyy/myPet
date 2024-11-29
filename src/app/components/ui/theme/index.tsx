import { useTheme } from "./hook";



export const ThemeButton = () => {
  const { toggleTheme } = useTheme();
  return (
    <>
      <button onClick={toggleTheme}>toggle</button>
    </>
  );
};
