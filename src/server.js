import express from 'express';
import cors from 'cors';
import { logger } from './utils/logger.js';
import { getEnvVar } from './utils/getEnvVar.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import moviesRouter from './routers/movies.js';

export const startServer = () => {
  const app = express();

  //Middleware express.json() обробляє та розпаковує дані, перетворюючи їх на об'єкт JavaScript і додаючи до req.body.Тобто без цього не буде об'єкту req.body

  app.use(express.json());

  app.use(cors);

  app.use(logger);

  app.use('/movies', moviesRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  const PORT = Number(getEnvVar('PORT', '3000'));

  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
};
