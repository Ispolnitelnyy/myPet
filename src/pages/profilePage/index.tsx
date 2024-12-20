import { classNames } from "shared/helpers/classNames";
import DynamicModuleLoaderWrapper, {
   ReducersList,
} from "../../shared/helpers/components/dynamicModuleLoaderWrapper";
import { profileReducer } from "../../entities/profile/model/slice";
import { memo, useEffect } from "react";
import {
   useAppDispatch,
   useAppSelector,
} from "../../app/providers/redux/hooks";
import { fetchProfileData } from "../../entities/profile/model/services";
import ProfileCard from "../../entities/profile/ui/profileCard";
import { getProfileData } from "entities/profile/model/state/getProfileData";
import { getProfileIsLoading } from "entities/profile/model/state/getProfileIsLoading";
import { getProfileError } from "entities/profile/model/state/getProfileError";

const redusers: ReducersList = {
   profile: profileReducer,
};
interface ProfilePageProps {
   className?: string;
}

export const ProfilePage = memo(({ className }: ProfilePageProps) => {
   const data = useAppSelector(getProfileData);
   const isLoading = useAppSelector(getProfileIsLoading);
   const error = useAppSelector(getProfileError);
   const dispatch = useAppDispatch();
   useEffect(() => {
      dispatch(fetchProfileData());
   }, [dispatch]);
   return (
      <DynamicModuleLoaderWrapper reducers={redusers} removeAfterUnmount>
         <div className={classNames("", {}, [className])}>
            <ProfileCard data={data} isLoading={isLoading} error={error} />
         </div>
      </DynamicModuleLoaderWrapper>
   );
});

export default ProfilePage;
