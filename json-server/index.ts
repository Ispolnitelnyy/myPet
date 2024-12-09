import fs from "fs";
const jsonServer = require('json-server');
import path from "path";

// Захардкоженные типы для Request, Response и NextFunction
interface Request {
   body: any;
   headers: Record<string, string | undefined>;
}

interface Response {
   json: (body: any) => void;
   status: (code: number) => Response;
}

type NextFunction = () => void;

// Создаем сервер
const server = jsonServer.create();

// Определяем путь к файлу db.json
const router = jsonServer.router(path.resolve(__dirname, "db.json"));

// Подключаем middleware по умолчанию
server.use(jsonServer.defaults());
server.use(jsonServer.bodyParser);

// Добавляем задержку для имитации реального API
server.use(async (req: Request, res: Response, next: NextFunction) => {
   await new Promise((resolve) => {
      setTimeout(resolve, 800);
   });
   next();
});

// Эндпоинт для логина
server.post("/login", (req: Request, res: Response) => {
   try {
      const { username, password } = req.body;

      // Чтение данных из db.json
      const dbPath = path.resolve(__dirname, "db.json");
      const dbData = fs.readFileSync(dbPath, "utf-8");
      const db = JSON.parse(dbData);

      const { users = [] } = db;

      // Поиск пользователя
      const userFromBd = users.find(
         (user: { username: string; password: string }) =>
            user.username === username && user.password === password
      );

      if (userFromBd) {
         return res.json(userFromBd);
      }

      return res.status(403).json({ message: "User not found" });
   } catch (e) {
      console.error(e);
      return res.status(500).json({ message: (e as Error).message });
   }
});

// Проверяем авторизацию пользователя
server.use((req: Request, res: Response, next: NextFunction) => {
   if (!req.headers.authorization) {
      return res.status(403).json({ message: "AUTH ERROR" });
   }
   next();
});

// Используем маршруты из json-server
server.use(router);

// Запускаем сервер
server.listen(8000, () => {
   console.log("Server is running on port 8000");
});
