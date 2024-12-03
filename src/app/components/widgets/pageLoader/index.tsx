import { classNames } from "app/components/shared/helpers/classNames";
import cls from "./index.module.scss";
import Loader from "app/components/shared/ui/loader";

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
