import {
  getMovies,
  getMovieById,
  createMovie,
  deleteMovie,
  updateMovie,
} from '../services/movies.js';
import createHttpError from 'http-errors';

export const getMoviesController = async (req, res) => {
  const movie = await getMovies();

  res.json({
    status: 200,
    message: 'Successfully found movies',
    movie,
  });
};

export const getMovieByIdController = async (req, res) => {
  const { movieId } = req.params;

  const movie = await getMovieById(movieId);

  if (!movie) {
    throw createHttpError(404, 'Movie not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found a movie with id ${movieId}`,
    movie,
  });
};

export const createMovieController = async (req, res) => {
  const movie = await createMovie(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a student!`,
    data: movie,
  });
};

export const deleteMovieController = async (req, res, next) => {
  const { movieId } = req.params;
  const movie = await deleteMovie(movieId);

  if (!movie) {
    next(createHttpError(404, 'Movie not found'));
    return;
  }
  res.status(204).send();
};

export const upsertMovieController = async (req, res, next) => {
  const { movieId } = req.params;
  const result = await updateMovie(movieId, req.body, {
    upsert: true,
  });

  if (!result) {
    next(createHttpError(404, 'Student is not found'));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Successfully upserted a movie!',
    data: result.movie,
  });
};

export const patchMovieController = async (req, res, next) => {
  const { movieId } = req.params;
  const result = await updateMovie(movieId, req.body);

  if (!result) {
    next(createHttpError(404, 'Movie is not found'));
    return;
  }

  res.json({
    status: 200,
    message: 'Successfully patched a student!',
    data: result.movie,
  });
};
