import { classNames } from "shared/helpers/classNames";
import cls from "./index.module.scss";
import { useTranslation } from "react-i18next";
import Text, { TextAlignEnums, TextThemeEnums } from "shared/ui/text";
import Button, { ThemeButtonEnums } from "shared/ui/button";
import Input from "shared/ui/input";
import { Profile } from "entities/profile/model/types";
import Loader from "shared/ui/loader";

interface ProfileCardProps {
   className?: string;
   data?: Profile;
   isLoading?: boolean;
   error?: string;
}

export const ProfileCard = (props: ProfileCardProps) => {
   const { t } = useTranslation("profile");
   const { className, data, isLoading, error } = props;
   if (isLoading) {
      return (
         <div
            className={classNames(cls.profilecard, {}, [
               className,
               cls.loading,
            ])}
         >
            <Loader />
         </div>
      );
   }
   if (error) {
      return (
         <div
            className={classNames(cls.profilecard, {}, [className, cls.error])}
         >
            <Text
               theme={TextThemeEnums.ERROR}
               title={"Не удалось получить данные"}
               text={"Попробуйте обновить страницу"}
               align={TextAlignEnums.CENET}
            />
         </div>
      );
   }

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
