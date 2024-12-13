import { classNames } from "shared/helpers/classNames";
import cls from "./index.module.scss";

interface ProfilePageProps {
   className?: string;
}

export const ProfilePage = ({ className }: ProfilePageProps) => {
   return (
      <div className={classNames(cls.profilepage, {}, [className])}>aaa</div>
   );
};

export default ProfilePage;
