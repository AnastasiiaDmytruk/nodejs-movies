import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getMovieByIdController,
  getMoviesController,
  createMovieController,
  deleteMovieController,
  upsertMovieController,
  patchMovieController,
} from '../controllers/movies.js';

const moviesRouter = Router();

moviesRouter.get('/', ctrlWrapper(getMoviesController));

moviesRouter.get('/:movieId', ctrlWrapper(getMovieByIdController));

moviesRouter.post('/', ctrlWrapper(createMovieController));

moviesRouter.delete('/:movieId', ctrlWrapper(deleteMovieController));

moviesRouter.put('/:movieId', ctrlWrapper(upsertMovieController));

moviesRouter.patch('/', ctrlWrapper(patchMovieController));

export default moviesRouter;
