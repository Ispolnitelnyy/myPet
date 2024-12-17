import { classNames } from "shared/helpers/classNames";
import DynamicModuleLoaderWrapper, { ReducersList } from "../../shared/helpers/components/dynamicModuleLoaderWrapper";
import { profileReducer } from "../../entities/profile/model/slice";
import { memo, useEffect } from "react";
import { useAppDispatch } from "../../app/providers/redux/hooks";
import { fetchProfileData } from "../../entities/profile/model/services";
import ProfileCard from "../../entities/profile/ui/profileCard";

const redusers: ReducersList = {
   profile: profileReducer,
};
interface ProfilePageProps {
   className?: string;
}

export const ProfilePage = memo(({ className }: ProfilePageProps) => {
   const dispatch = useAppDispatch();
   useEffect(() => {
      dispatch(fetchProfileData());
   }, [dispatch]);
   return (
      <DynamicModuleLoaderWrapper reducers={redusers} removeAfterUnmount>
         <div className={classNames('', {}, [className])}>
            <ProfileCard />
         </div>
      </DynamicModuleLoaderWrapper>
   );
});

export default ProfilePage;
