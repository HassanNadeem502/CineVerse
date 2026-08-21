import Movie from "../models/Movie.js";
import { fetchFromTMDB } from "../Services/tmdbService.js";

export const getMoviesByCategory = async (endpoint, category) => {
  // 1. Check MongoDB
  const movies = await Movie.find({
    categories: category,
  });

  if (movies.length > 0) {
    return movies;
  }

  // 2. Fetch from TMDB
  const tmdbData = await fetchFromTMDB(endpoint);

  // 3. Convert TMDB data → MongoDB format
  const movieDocuments = tmdbData.results.map((movie) => ({
    tmdbId: movie.id,

    title: movie.title,
    overview: movie.overview,

    poster_path: movie.poster_path,
    backdrop_path: movie.backdrop_path,

    release_date: movie.release_date,
    vote_average: movie.vote_average,

    popularity: movie.popularity,

    genre_ids: movie.genre_ids,

    adult: movie.adult,

    original_language: movie.original_language,

    original_title: movie.original_title,

    vote_count: movie.vote_count,

    category,
  }));

  // 4. Save all movies
  for (const movie of movieDocuments) {
    await Movie.findOneAndUpdate(
      {
        tmdbId: movie.tmdbId,
      },

      {
        //Movie ki sari latest information update kar do.
        $set: {
          ...movie,
        },

        $addToSet: {
          categories: category,
        },
      },

      {
        upsert: true,
        new: true,
      },
    );
  }

  return movieDocuments;
};
