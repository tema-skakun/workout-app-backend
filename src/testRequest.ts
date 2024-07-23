// src/testRequest.ts
import express, { Request, Response, NextFunction } from 'express';
import { JwtPayload } from './types/jwt';
import dotenv from "dotenv";

dotenv.config();


// Расширение интерфейса Request
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

const port = process.env.PORT;

const app = express();
app.use(express.json());

// Пример middleware для установки свойства user
app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = { id: '123' }; // Устанавливаем пользовательские данные
  next();
});

// Пример маршрута
app.get('/test', (req: Request, res: Response) => {
  if (req.user) {
    res.json({ userId: req.user.id });
  } else {
    res.status(401).send('Unauthorized');
  }
});

app.listen(port, () => {
  console.log('Server running on port ' + port);
});
