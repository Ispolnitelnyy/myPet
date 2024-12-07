import { screen } from "@testing-library/react";
import { LangSwitcherButton } from ".";
import { withTranslation } from "react-i18next";
import { renderWithTranslation } from "shared/configs/tests/renderWithTranslation";

describe("LangSwitcherButton tests", () => {
   it("render LangSwitcherButton component", () => {
      const LangSwitcherButtonWithTranslation =
         withTranslation()(LangSwitcherButton);
      renderWithTranslation(<LangSwitcherButtonWithTranslation />);

      expect(screen.getByTestId("langswitherbutton")).toBeInTheDocument();
   });
});
