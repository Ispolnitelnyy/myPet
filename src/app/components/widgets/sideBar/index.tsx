import { classNames } from "app/components/shared/helpers/classNames";
import cls from "./index.module.scss";
import { useState } from "react";
import ThemeSwicherButton from "../themeSwicherButton";
import { LangSwitcherButton } from "../langSwitherButton";

interface SideBarProps {
  className?: string;
}

export const SideBar = ({ className }: SideBarProps) => {
  const [collapsed, setCollapsed] = useState(true);
  const open = () => {
    setCollapsed(false);
  };
  const closed = () => {
    setTimeout(() => setCollapsed(true));
  };
  return (
    <div
      className={classNames(cls.sidebar, { [cls.collapsed]: collapsed }, [className])}
      onMouseEnter={open}
      onMouseLeave={closed}
    >
      <div className={cls.switcher}>
        <ThemeSwicherButton />
        <LangSwitcherButton className={cls.lang} />
      </div>
    </div>
  );
};

export default SideBar;
