import {
   fireEvent,
   render,
   screen,
   waitFor,
   act,
} from "@testing-library/react";
import SideBar from ".";
import { ComponentRender } from "shared/configs/tests/componentRender";

describe("SideBar tests", () => {
   it("render SideBar component", () => {
      ComponentRender(<SideBar />);

      expect(screen.getByTestId("sidebar")).toBeInTheDocument();
   });

   it("sideBar должен разворачиваться при наведении мыши и сворачиваться при ее уходе", async () => {
      // Активируем фейковые таймеры
      jest.useFakeTimers();
      ComponentRender(<SideBar />);

      const sidebar = screen.getByTestId("sidebar");

      // Изначально свернут
      expect(sidebar).toHaveClass("collapsed");

      // Разворачивание (наводим курсор)
      fireEvent.mouseEnter(sidebar);
      expect(sidebar).toHaveClass("sidebar");

      // Сворачивание (убираем курсор)
      fireEvent.mouseLeave(sidebar);

      // Ожидаем, пока таймеры завершатся и класс обновится
      await act(async () => {
         jest.runAllTimers(); // Запуск всех таймеров
      });

      // Ожидаем, пока класс не обновится
      await waitFor(() => {
         expect(sidebar).toHaveClass("collapsed");
      });

      // Проверяем, что sidebar свернулся
      expect(sidebar).toHaveClass("collapsed");

      // Возвращаем реальное время
      jest.useRealTimers();
   });
   test("test button open/close", () => {
      ComponentRender(<SideBar />);
      const toggleBtn = screen.getByTestId("sidebar-toggle");
      expect(screen.getByTestId("sidebar")).toBeInTheDocument();
      fireEvent.click(toggleBtn);
      expect(screen.getByTestId("sidebar")).toHaveClass("sidebar");
   });
});
