import { render, screen } from "@testing-library/react";
import SideBar from ".";

describe("sideBar tests", () => {
   it("render SideBar component", () => {
      render(<SideBar />);

      expect(screen.getByTestId("sidebar")).toBeInTheDocument();
   });
});
