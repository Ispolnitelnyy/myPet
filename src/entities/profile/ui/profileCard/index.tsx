import { classNames } from "shared/helpers/classNames";
import cls from "./index.module.scss";
import { useAppSelector } from "app/providers/redux/hooks";
import { getProfileData } from "entities/profile/model/state/getProfileData";
import { getProfileIsLoading } from "entities/profile/model/state/getProfileIsLoading";
import { getProfileError } from "entities/profile/model/state/getProfileError";
import { useTranslation } from "react-i18next";
import Text from "shared/ui/text";
import Button, { ThemeButtonEnums } from "shared/ui/button";
import Input from "shared/ui/input";

interface ProfileCardProps {
   className?: string;
}

export const ProfileCard = ({ className }: ProfileCardProps) => {
   const { t } = useTranslation("profile");
   const data = useAppSelector(getProfileData);
   const isLoading = useAppSelector(getProfileIsLoading);
   const error = useAppSelector(getProfileError);

   return (
      <div className={classNames(cls.profilecard, {}, [className])}>
         <div className={cls.header}>
            <Text title={t("Профиль")} />
            <Button theme={ThemeButtonEnums.OUTLINE} className={cls.editbtn}>
               {t("Редактировать")}
            </Button>
         </div>
         <div className={cls.data}>
            <Input
               value={data?.name}
               placeholder={t("Ваше имя")}
               className={cls.input}
            />
            <Input
               value={data?.lastname}
               placeholder={t("Ваша фамилия")}
               className={cls.input}
            />
         </div>
      </div>
   );
};

export default ProfileCard;
