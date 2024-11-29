// это паблик апи он собирает только необходимое и регулирует то что отдаем наружу
// мне не очень нужен, но в качестве примера его создам
// здесь импорт должен быть всегда отсительным
// а вот уже в root где мы провайдер применяем ставим абсолютный путь

import ThemeProvider from "./themeProvider";
import { AppRouter } from "./router";

export { ThemeProvider };
export { AppRouter };
