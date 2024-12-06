import { classNames } from "app/components/shared/helpers/classNames";
import cls from "./index.module.scss";
import { useRef, useState } from "react";
import ThemeSwicherButton from "../themeSwicherButton";
import { LangSwitcherButton } from "../langSwitherButton";
import GetErrorButton from "../getErrorButton";
import Button, { ThemeButtonEnums } from "app/components/shared/ui/button";

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
      <>
         
         <div
            data-testid="sidebar"
            className={classNames(cls.sidebar, { [cls.collapsed]: collapsed }, [
               className,
            ])}
            onMouseEnter={open}
            onMouseLeave={closed}
         ><Button
            data-testid="sidebar-toggle"
            onClick={onToggle}
            className={cls.collapseBtn}
             theme={ThemeButtonEnums.CLEAR}
            //  size={ButtonSize.L}
            //  square
         >
            {collapsed ? ">" : "<"}
         </Button>
            {!collapsed && (
               <div className={cls.switcher}>
                  <ThemeSwicherButton />
                  <LangSwitcherButton className={cls.lang} />
                  <GetErrorButton />
               </div>
            )}
         </div>
      </>
   );
};

export default SideBar;
