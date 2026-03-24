import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRouter from './routes/notesRoutes.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

export const startServer = async () => {
  const app = express();

  await connectMongoDB();

  app.use(logger);
  app.use(
    cors({
      origin: true,
      credentials: true,
    }),
  );

  app.use(express.json());
  app.use(cookieParser());

  app.use('/auth', authRouter);
  app.use('/notes', notesRouter);
  app.use('/users', userRouter);

  app.use(notFoundHandler);

  app.use(errors());
  app.use(errorHandler);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
};

startServer();
