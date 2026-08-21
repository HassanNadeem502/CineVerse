import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    tmdbId: {
      type: Number,
      required: true,
      unique: true,
    },

    title: {
      type: String,
      required: true,
    },

    overview: {
      type: String,
      default: "",
    },

    poster_path: {
      type: String,
      default: "",
    },

    backdrop_path: {
      type: String,
      default: "",
    },

    release_date: {
      type: String,
      default: "",
    },

    vote_average: {
      type: Number,
      default: 0,
    },

    popularity: {
      type: Number,
      default: 0,
    },

    genre_ids: [
      {
        type: Number,
      },
    ],

    adult: {
      type: Boolean,
      default: false,
    },

    original_language: {
      type: String,
      default: "",
    },

    original_title: {
      type: String,
      default: "",
    },

    vote_count: {
      type: Number,
      default: 0,
    },

    categories: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
