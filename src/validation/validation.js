import Joi from 'joi';
import { movieTypeList } from '../constants/movies.js';

export const createMovieSchema = Joi.object({
  title: Joi.string().required(),
  director: Joi.string().required(),
  genre: Joi.string().required(),
  releaseYear: Joi.number()
    .min(1895)
    .required()
    .messages({ 'number.min': 'Movie before 1895 is not found' }),
  isFavourite: Joi.boolean(),
  movieType: Joi.string().valid(...movieTypeList),
});

export const updateMovieSchema = Joi.object({
  title: Joi.string().required(),
  director: Joi.string().required(),
  genre: Joi.string().required(),
  releaseYear: Joi.number()
    .min(1895)
    .required()
    .messages({ 'number.min': 'Movie before 1895 is not found' }),
  isFavourite: Joi.boolean(),
  movieType: Joi.string().valid(...movieTypeList),
});
