import { classNames } from "shared/helpers/classNames";
import cls from "./index.module.scss";
import Loader from "shared/ui/loader";

interface PageLoaderProps {
   className?: string;
}

export const PageLoader = ({ className }: PageLoaderProps) => {
   return (
      <div className={classNames(cls.pageloader, {}, [className])}>
         <Loader />
      </div>
   );
};

export default PageLoader;
