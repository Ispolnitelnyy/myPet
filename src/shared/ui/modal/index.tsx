import { classNames, Mods } from "shared/helpers/classNames";
import cls from "./index.module.scss";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import ReactPortal from "../portal";
import { useTheme } from "app/providers/themeProvider/useTheme";

interface ModalProps {
   className?: string;
   children?: ReactNode;
   isOpen?: boolean;
   onClose?: () => void;
   lazy?: boolean;
}

export const Modal = (props: ModalProps) => {
   const { className, children, isOpen, onClose, lazy } = props;

   const [isClosing, setIsClosing] = useState(false);
   const [isMounted, setIsMounted] = useState(false);
   const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
   // const timerRef = useRef<number | null>(null);

   const { theme } = useTheme();

   useEffect(() => {
      if (isOpen) {
         setIsMounted(true);
      }
   }, [isOpen]);

   const closeHandler = useCallback(() => {
      if (onClose) setIsClosing(true);
      timerRef.current = setTimeout(() => {
         onClose?.();
         setIsClosing(false);
      }, 300);
   }, [onClose]);

   const onKeyDown = useCallback(
      (e: KeyboardEvent) => {
         if (e.key === "Escape") {
            closeHandler();
         }
      },
      [closeHandler]
   );

   const onContentClick = (e: React.MouseEvent) => {
      e.stopPropagation();
   };

   useEffect(() => {
      if (isOpen) {
         window.addEventListener("keydown", onKeyDown);
      }
      return () => {
         if (timerRef.current) {
            clearTimeout(timerRef.current); // Убедимся, что timerRef.current определён
         }
         window.removeEventListener("keydown", onKeyDown);
      };
   }, [isOpen, onKeyDown]);

   const mods: Mods = {
      [cls.opened]: isOpen,
      [cls.isclosing]: isClosing,
   };

   if (lazy && !isMounted) {
      return null;
   }

   return (
      <ReactPortal>
         <div
            className={classNames(cls.modal, mods, [
               className,
               theme,
               "appmodal",
            ])}
         >
            <div className={cls.overlay} onClick={closeHandler}>
               <div className={cls.content} onClick={onContentClick}>
                  {children}
               </div>
            </div>
         </div>
      </ReactPortal>
   );
};

export default Modal;
