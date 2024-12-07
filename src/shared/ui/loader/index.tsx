import { classNames } from "shared/helpers/classNames";
import cls from "./index.module.scss";

interface LoaderProps {
   className?: string;
}

export const Loader = ({ className }: LoaderProps) => {
   return <div className={classNames(cls.loader, {}, [className])} />;
};

export default Loader;
