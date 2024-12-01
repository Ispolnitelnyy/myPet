import { classNames } from "app/components/shared/helpers/classNames";
import cls from "./index.module.scss";
import { useState } from "react";
import ThemeSwicherButton from "../themeSwicher";

interface SideBarProps {
  className?: string;
}

export const SideBar = ({ className }: SideBarProps) => {
  const [collapsed, setCollapsed] = useState(true);
  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };
  return (
    <div
      className={classNames(cls.sidebar, { [cls.collapsed]: collapsed }, [className])}
      onMouseEnter={onToggle}
      onMouseLeave={onToggle}
    >
      <div className={cls.switcher}>
        <ThemeSwicherButton />
      </div>
    </div>
  );
};

export default SideBar;
