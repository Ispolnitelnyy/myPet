/* eslint-disable @typescript-eslint/no-inferrable-types */
import fs from "fs";
import path from "path";

// Тип для значения таймаута
type TimeoutValue = number;

// Путь к файлу await-selector-present.js
const filePath: string = path.join(
   __dirname,
   "../",
   "node_modules",
   "@loki",
   "browser",
   "src",
   "await-selector-present.js"
);

// Функция для обновления таймаута
const updateTimeout = (timeoutValue: TimeoutValue): void => {
   if (!fs.existsSync(filePath)) {
      console.error(`Файл не найден: ${filePath}`);
      process.exit(1);
   }

   try {
      // Читаем содержимое файла
      const fileContent: string = fs.readFileSync(filePath, "utf-8");

      // Регулярное выражение для поиска строки с таймаутом
      const timeoutRegex: RegExp = /timeout\s*=\s*\d+/;

      // Заменяем значение таймаута
      const updatedContent: string = fileContent.replace(
         timeoutRegex,
         `timeout = ${timeoutValue}`
      );

      // Записываем обновлённое содержимое обратно
      fs.writeFileSync(filePath, updatedContent, "utf-8");
      console.log(`Таймаут успешно обновлён на ${timeoutValue}ms.`);
   } catch (error) {
      console.error("Ошибка при обновлении таймаута:", error);
      process.exit(1);
   }
};

// Вызываем функцию с новым значением таймаута
updateTimeout(5000);
