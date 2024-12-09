import { classNames } from "shared/helpers/classNames";
import cls from "./index.module.scss";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import ReactPortal from "../portal";
import { useTheme } from "app/providers/themeProvider/useTheme";

interface ModalProps {
   className?: string;
   children?: ReactNode;
   isOpen?: boolean;
   onClose?: () => void;
}

export const Modal = (props: ModalProps) => {
   const { className, children, isOpen, onClose } = props;

   const [isClosing, setIsClosing] = useState(false);
   const timerRef = useRef<ReturnType<typeof setTimeout>>();
   const { theme } = useTheme();

   const closeHandler = useCallback(() => {
      if (onClose) setIsClosing(true);
      timerRef.current = setTimeout(() => {
         onClose();
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
         clearTimeout(timerRef.current);
         window.removeEventListener("keydown", onKeyDown);
      };
   }, [isOpen, onKeyDown]);

   const mods: Record<string, boolean> = {
      [cls.opened]: isOpen,
      [cls.isclosing]: isClosing,
   };

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
