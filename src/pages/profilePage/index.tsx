import { classNames } from "shared/helpers/classNames";
import cls from "./index.module.scss";
import { memo } from "react";
import DynamicModuleLoaderWrapper, {
   ReducersList,
} from "shared/helpers/components/dynamicModuleLoaderWrapper";
import { profileReducer } from "entities/profile/model/slice";

interface ProfilePageProps {
   className?: string;
}

const redusers: ReducersList = {
   profile: profileReducer,
};

export const ProfilePage = memo(({ className }: ProfilePageProps) => {
   return (
      <DynamicModuleLoaderWrapper reducers={redusers} removeAfterUnmount>
         <div className={classNames(cls.profilepage, {}, [className])}>aaa</div>
      </DynamicModuleLoaderWrapper>
   );
});

export default ProfilePage;
