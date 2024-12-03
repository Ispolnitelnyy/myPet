import { classNames } from "app/components/shared/helpers/classNames";
import Button, { ThemeButtonEnums } from "app/components/shared/ui/button";
import { useTranslation } from "react-i18next";


interface LangSwitcherButtonProps {
  className?: string;
}

export const LangSwitcherButton = ({ className }: LangSwitcherButtonProps) => {
  const [t, i18n] = useTranslation();
  const tranlate = () => {
    i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
  };
  return (
    <Button
      className={classNames('', {}, [className])}
      theme={ThemeButtonEnums.CLEAR}
      onClick={tranlate}
    >
      {t("язык")}{" "}
    </Button>
  );
};
