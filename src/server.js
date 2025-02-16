import express from 'express';
// import pino from 'pino-http';
import cors from 'cors';

import { getMovieById, getMovies } from './services/movies.js';

import { getEnvVar } from './utils/getEnvVar.js';

export const startServer = () => {
  const app = express();

  //Middleware express.json() обробляє та розпаковує дані, перетворюючи їх на об'єкт JavaScript і додаючи до req.body.Тобто без цього не буде об'єкту req.body

  app.use(express.json());
  app.use(cors);

  // app.use(
  //   pino({
  //     transport: {
  //       target: 'pino-pretty',
  //     },
  //   }),
  // );

  app.get('/movies', async (req, res) => {
    const data = await getMovies();

    res.json({
      status: 200,
      message: 'Successfully found movies',
      data,
    });
  });

  app.get('/movies/:id', async (req, res) => {
    const { id } = req.params;

    const data = await getMovieById(id);

    if (!data) {
      return res.status(404).json({
        status: 404,
        message: `Movie with id ${id} not found`,
      });
    }

    res.json({
      status: 200,
      message: `Successfully found a movie with id ${id}`,
      data,
    });
  });

  app.use((req, res) => {
    res.status(404).json({
      message: `${req.url} not found`,
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Someting went wrong',
      error: err.message,
    });
  });

  const PORT = Number(getEnvVar('PORT', '3000'));

  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
};
