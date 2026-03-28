import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRouter from './routes/notesRoutes.js';

export const startServer = async () => {
  const app = express();

  // 1. Підключаємо базу (має бути до запуску сервера!)
  await connectMongoDB();

  // 2. Middleware
  app.use(logger);
  app.use(cors());
  app.use(express.json());

  // 3. Маршрути (всі запити /notes підуть сюди)
  app.use(notesRouter);

  // 4. Обробка помилок
  app.use(notFoundHandler);
  app.use(errorHandler);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
