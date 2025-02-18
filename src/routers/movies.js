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
import { validateBody } from '../middlewares/validateBody.js';
import {
  createMovieSchema,
  updateMovieSchema,
} from '../validation/validation.js';
import { isValidId } from '../middlewares/isValidId.js';

const moviesRouter = Router();

moviesRouter.get('/', ctrlWrapper(getMoviesController));

moviesRouter.get('/:movieId', isValidId, ctrlWrapper(getMovieByIdController));

moviesRouter.post(
  '/',
  validateBody(createMovieSchema),
  ctrlWrapper(createMovieController),
);

moviesRouter.put(
  '/:movieId',
  isValidId,
  validateBody(createMovieSchema),
  ctrlWrapper(upsertMovieController),
);

moviesRouter.patch(
  '/',
  validateBody(updateMovieSchema),
  ctrlWrapper(patchMovieController),
);

moviesRouter.delete('/:movieId', isValidId, ctrlWrapper(deleteMovieController));

export default moviesRouter;
