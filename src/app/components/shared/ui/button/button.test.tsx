import Button, { ThemeButtonEnums } from ".";
import { render, screen } from "@testing-library/react";

describe("метот из документации", () => {
   it("render Button component", () => {
      render(<Button>TEST</Button>);

      screen.debug();
   });
});

// у него проходит без async
describe("метот ulbi", () => {
   it("render Button component", async () => {
      render(<Button>TEST</Button>);

      expect(await screen.findByText("TEST")).toBeInTheDocument();
   });

   it("render Button component with prop (theme: clear)", async () => {
      render(<Button theme={ThemeButtonEnums.CLEAR}>TEST</Button>);

      expect(await screen.findByText("TEST")).toHaveClass("clear");
      screen.debug();
   });
});
