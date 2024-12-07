import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ReactPortalProps {
   children: ReactNode;
   element?: HTMLElement;
}

export const ReactPortal = ({
   children,
   element = document.body,
}: ReactPortalProps) => {
   return createPortal(children, element);
};

export default ReactPortal;
