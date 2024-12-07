const fs = require('fs');
const path = require('path');

// Путь к файлу await-selector-present.js
const filePath = path.join(
  __dirname,
  'node_modules',
  '@loki',
  'browser',
  'src',
  'await-selector-present.js'
);

// Функция для обновления таймаута
const updateTimeout = (timeoutValue) => {
  if (!fs.existsSync(filePath)) {
    console.error(`Файл не найден: ${filePath}`);
    process.exit(1);
  }

  try {
    // Читаем содержимое файла
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Заменяем значение таймаута
    const updatedContent = fileContent.replace(
      /timeout\s*=\s*\d+/,
      `timeout = ${timeoutValue}`
    );

    // Записываем обновлённое содержимое обратно
    fs.writeFileSync(filePath, updatedContent, 'utf-8');
    console.log(`Таймаут успешно обновлён на ${timeoutValue}ms.`);
  } catch (error) {
    console.error('Ошибка при обновлении таймаута:', error);
    process.exit(1);
  }
};

// Вызываем функцию с новым значением таймаута
updateTimeout(45000);
