import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { movieId } = req.params;
  if (!isValidObjectId(movieId)) {
    throw createHttpError(404, `${movieId} is not a valid id`);
  }
  next();
};
