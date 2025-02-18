import { MovieCollection } from '../db/models/Movie.js';

export const getMovies = () => MovieCollection.find();

export const getMovieById = (movieId) => MovieCollection.findById(movieId);

export const createMovie = async (payload) => {
  const movie = await MovieCollection.create(payload);
  return movie;
};

export const deleteMovie = async (movieId) => {
  const movie = await MovieCollection.findOneAndDelete({ _id: movieId });
  return movie;
};

export const updateMovie = async (movieId, payload, options = {}) => {
  const { upsert = false } = options;
  const rawResult = await MovieCollection.findOneAndUpdate(
    { _id: movieId },
    payload,
    {
      // new: true,
      upsert,
      // runValidators: true,
      includeResultMetadata: true,
      // ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    movie: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
