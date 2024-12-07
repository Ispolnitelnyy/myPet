import { classNames } from "shared/helpers/classNames";
import cls from "./index.module.scss";
import { useRef, useState } from "react";
import ThemeSwicherButton from "../themeSwicherButton";
import { LangSwitcherButton } from "../langSwitherButton";
import GetErrorButton from "../bugButton";
import Button, { SizesButtonEnums, ThemeButtonEnums } from "shared/ui/button";
import SideBarHeader from "./sideBarHeader";

interface SideBarProps {
   className?: string;
}

export const SideBar = ({ className }: SideBarProps) => {
   const [collapsed, setCollapsed] = useState(true);
   const timeoutRef = useRef<NodeJS.Timeout | null>(null);
   const open = () => {
      setCollapsed(false);
   };
   const closed = () => {
      timeoutRef.current = setTimeout(() => {
         setCollapsed(true);
      });
   };
   const onToggle = () => {
      setCollapsed((prev) => !prev);
   };

   return (
      <div
         data-testid="sidebar"
         className={classNames(cls.sidebar, { [cls.collapsed]: collapsed }, [
            className,
         ])}
         onMouseEnter={open}
         onMouseLeave={closed}
      >
         <div className={cls.items}>
            <SideBarHeader collapsed={collapsed} />
         </div>
         <Button
            data-testid="sidebar-toggle"
            onClick={onToggle}
            className={cls.collapsebtn}
            theme={ThemeButtonEnums.BACKGROUND_INVERTED}
            size={SizesButtonEnums.M}
         >
            {collapsed ? ">" : "<"}
         </Button>
         {!collapsed && (
            <div className={cls.switchers}>
               <ThemeSwicherButton />
               <LangSwitcherButton className={cls.lang} />
               <GetErrorButton />
            </div>
         )}
      </div>
   );
};

export default SideBar;
