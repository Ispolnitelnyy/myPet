import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SideBar from ".";

describe("sideBar tests", () => {
   it("render SideBar component", () => {
      render(<SideBar />);

      expect(screen.getByTestId("sidebar")).toBeInTheDocument();
   });

   it("sideBar должен разворачиваться при наведении мыши и сворачиваться при ее уходе", async () => {
      // Активируем фейковые таймеры
      jest.useFakeTimers();
      render(<SideBar />);

      const sidebar = screen.getByTestId("sidebar");

      // Изначально свернут
      expect(sidebar).toHaveClass("collapsed");

      // разворачивание
      fireEvent.mouseEnter(sidebar);
      expect(sidebar).toHaveClass("sidebar");

      // сворачивание
      fireEvent.mouseLeave(sidebar);
      // Завершаем таймеры
      jest.runAllTimers();
      // Ожидаем, пока класс не обновится
      await waitFor(() => {
         expect(sidebar).toHaveClass("collapsed");
      });
      // Проверяем, что sidebar свернулся
      expect(sidebar).toHaveClass("collapsed");

      // Возвращаем реальное время
      jest.useRealTimers();
   });
});
