import { model, Schema } from 'mongoose';
import { movieTypeList } from '../../constants/movies.js';
import { handleSaveError, setUpdateSettings } from '../models/hooks.js';

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    releaseYear: {
      type: Number,
      min: 1985,
      required: true,
    },
    isFavourite: {
      type: Boolean,
      default: false,
      required: true,
    },

    movieType: {
      type: String,
      enum: [...movieTypeList],
      default: 'feature',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

movieSchema.post('save', handleSaveError);
movieSchema.pre('findOneAndUpdate', setUpdateSettings);
movieSchema.post('findOneAndUpdate', handleSaveError);

export const MovieCollection = model('movie', movieSchema);
