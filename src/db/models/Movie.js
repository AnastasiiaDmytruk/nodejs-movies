import { model, Schema } from 'mongoose';

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
      required: true,
    },
    isFavourite: {
      type: Boolean,
      default: false,
      required: true,
    },
    // movieType: {
    //   type: String,
    //   enum: ['short', 'series'],
    //   default: 'feature',
    //   required: true,
    // },
  },
  {
    // timestamps: true,
    versionKey: false,
  },
);

export const MovieCollection = model('movie', movieSchema);
