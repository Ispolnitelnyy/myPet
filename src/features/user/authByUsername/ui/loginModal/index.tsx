import { classNames } from "shared/helpers/classNames";
import cls from "./index.module.scss";
import Modal from "shared/ui/modal";
import LoginForm from "../loginForm";

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
         <LoginForm />
      </Modal>
   );
};

export default LoginModal;
