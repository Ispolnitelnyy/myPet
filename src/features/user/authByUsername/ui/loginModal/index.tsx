import { classNames } from "shared/helpers/classNames";
import cls from "./index.module.scss";
import Modal from "shared/ui/modal";
// import LoginForm from "../loginForm"; // заменяем на LoginFormLazy, по хорошему удалить, чтобы он не подтягивался в бандл
import { LoginFormLazy } from "../loginForm/loginFormLazy";
import { Suspense } from "react";
import Loader from "shared/ui/loader";

interface LoginModalProps {
   className?: string;
   isOpen: boolean;
   onClose: () => void;
}

export const LoginModal = (props: LoginModalProps) => {
   const { className, isOpen, onClose } = props;

   return (
      <Modal
         className={classNames(cls.loginmodal, {}, [className])}
         isOpen={isOpen}
         onClose={onClose}
         lazy={true}
      >
         <Suspense fallback={<Loader />}>
            <LoginFormLazy />
         </Suspense>
      </Modal>
   );
};

export default LoginModal;
