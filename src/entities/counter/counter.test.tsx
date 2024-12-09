import { screen, waitFor } from "@testing-library/react";
import { Counter } from ".";
import { ComponentRender } from "shared/configs/tests/componentRender";
// import { ComponentRender } from "../../shared/configs/tests/componentRender";
import userEvent from "@testing-library/user-event";

describe("entity counter tests", () => {
   it("render Counter component", () => {
      ComponentRender(<Counter />, {
         initialState: { counter: { value: 10 } },
      });

      expect(screen.getByTestId("counter-value")).toHaveTextContent("10");
   });
   it("increment Counter component", async () => {
      ComponentRender(<Counter />, {
         initialState: { counter: { value: 10 } },
      });
      userEvent.click(screen.getByTestId("increment"));
      await waitFor(() =>
         expect(screen.getByTestId("counter-value")).toHaveTextContent("11")
      );
   });
   it("decrement Counter component", async () => {
      ComponentRender(<Counter />, {
         initialState: { counter: { value: 10 } },
      });
      userEvent.click(screen.getByTestId("decrement"));
      await waitFor(() =>
         expect(screen.getByTestId("counter-value")).toHaveTextContent("9")
      );
   });
});
