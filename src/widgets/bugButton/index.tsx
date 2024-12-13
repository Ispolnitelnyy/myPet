import Button, { ThemeButtonEnums } from "shared/ui/button";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// компонент для тестирования errorBoundary

export const GetErrorButton = memo(() => {
   const [error, setError] = useState(false);
   const { t } = useTranslation();
   useEffect(() => {
      if (error) {
         throw new Error();
      }
   }, [error]);

   const getError = () => {
      setError(true);
   };

   return (
      <Button onClick={getError} theme={ThemeButtonEnums.CLEAR} square={false}>
         {t("вызвать ошибку")}
      </Button>
   );
});

export default GetErrorButton;
