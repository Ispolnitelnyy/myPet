import { classNames } from "shared/helpers/classNames";
import cls from "./index.module.scss";
import { memo } from "react";

interface ProfilePageProps {
   className?: string;
}

export const ProfilePage = memo(({ className }: ProfilePageProps) => {
   return (
      <div className={classNames(cls.profilepage, {}, [className])}>aaa</div>
   );
});

export default ProfilePage;
