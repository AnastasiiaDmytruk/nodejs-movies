import { SORT_ORDER } from '../constants/index.js';
import { MovieCollection } from '../db/models/Movie.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getMovies = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = SORT_ORDER.ASC,
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * limit;

  const moviesQuery = MovieCollection.find(); //це потрібно коли є фільтрація

  if (filter.minReleaseYear) {
    moviesQuery.where('releaseYear').gte(filter.minReleaseYear);
  }
  if (filter.maxReleaseYear) {
    moviesQuery.where('releaseYear').lte(filter.maxReleaseYear);
  }

  const movies = await moviesQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const moviesCount = await MovieCollection.find()
    .merge(moviesQuery)
    .countDocuments();

  const paginationData = calculatePaginationData(moviesCount, perPage, page);

  return {
    data: movies,
    ...paginationData,
  };
};

export const getMovieById = (movieId) => MovieCollection.findById(movieId);

export const createMovie = async (payload) => {
  const movie = await MovieCollection.create(payload);
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

export const deleteMovie = async (movieId) => {
  const movie = await MovieCollection.findOneAndDelete({ _id: movieId });
  return movie;
};
