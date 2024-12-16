import { classNames } from "shared/helpers/classNames";
import cls from "./index.module.scss";
import { memo, useEffect } from "react";
import DynamicModuleLoaderWrapper, {
   ReducersList,
} from "shared/helpers/components/dynamicModuleLoaderWrapper";
import { profileReducer } from "../../entities/profile/model/slice";
import { useAppDispatch } from "app/providers/redux/hooks";
import { fetchProfileData } from "entities/profile/model/services";
import ProfileCard from "entities/profile/ui/profileCard";

interface ProfilePageProps {
   className?: string;
}

const redusers: ReducersList = {
   profile: profileReducer,
};

export const ProfilePage = memo(({ className }: ProfilePageProps) => {
   const dispatch = useAppDispatch();
   useEffect(() => {
      dispatch(fetchProfileData());
   }, [dispatch]);
   return (
      <DynamicModuleLoaderWrapper reducers={redusers} removeAfterUnmount>
         <div className={classNames(cls.profilepage, {}, [className])}>
            <ProfileCard />
         </div>
      </DynamicModuleLoaderWrapper>
   );
});

export default ProfilePage;
