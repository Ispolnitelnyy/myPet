import { classNames } from "shared/helpers/classNames";
import Button, { ThemeButtonEnums } from "shared/ui/button";
import { useTranslation } from "react-i18next";
import { memo } from "react";

interface LangSwitcherButtonProps {
   className?: string;
}

export const LangSwitcherButton = memo(
   ({ className }: LangSwitcherButtonProps) => {
      const [t, i18n] = useTranslation();
      const tranlate = () => {
         i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
      };
      return (
         <Button
            data-testid="langswitherbutton"
            className={classNames("", {}, [className])}
            theme={ThemeButtonEnums.CLEAR}
            onClick={tranlate}
            square={false}
         >
            {t("язык")}{" "}
         </Button>
      );
   }
);
