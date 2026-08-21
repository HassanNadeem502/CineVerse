import { useState } from "react";
import { toggleWatchlist } from "../../services/watchlistService";

const MovieHero = ({ movie, onTrailerOpen }) => {
  if (!movie) return null;

  const BACKDROP = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  const POSTER = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const [watchlistLoading, setWatchlistLoading] = useState(false);

  const handleWatchlist = async () => {
    try {
      setWatchlistLoading(true);

      const movieId = movie?._id ?? movie?.id ?? movie?.tmdbId;

      if (!movieId) {
        throw new Error("Unable to add movie to watchlist: missing movie ID.");
      }

      const response = await toggleWatchlist(movieId);

      alert(response.message);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setWatchlistLoading(false);
    }
  };
  return (
    <section className="relative w-full min-h-[80vh]">
      {/* Backdrop */}
      <img
        src={BACKDROP}
        alt={movie.title}
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
        "
      />

      {/* Dark Overlay */}
      <div
        className="
          absolute
          inset-0
          bg-black/75
        "
      />

      {/* Content */}
      <div
        className="
          relative
          container
          mx-auto
          px-6
          py-24

          flex
          flex-col
          md:flex-row
          items-center
          gap-10
        "
      >
        {/* Poster */}

        <img
          src={POSTER}
          alt={movie.title}
          className="
            w-72
            rounded-2xl
            shadow-2xl
          "
        />

        {/* Info */}

        <div className="text-white">
          <h1
            className="
              text-5xl
              font-black
              mb-6
            "
          >
            {movie.title}
          </h1>

          {/* Movie Meta */}

          <div
            className="
              flex
              flex-wrap
              gap-5
              text-lg
              text-gray-300
              mb-6
            "
          >
            <span>⭐ {movie.vote_average.toFixed(1)}</span>

            <span>📅 {movie.release_date?.slice(0, 4)}</span>

            <span>⏱ {movie.runtime} min</span>
          </div>

          {/* Genres */}

          <div className="flex flex-wrap gap-3 mb-8">
            {movie.genres?.map((genre) => (
              <span
                key={genre.id}
                className="px-4 py-2 rounded-full bg-purple-600 text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* Buttons */}

          <div className="flex gap-5">
            <button
              className="
                bg-purple-600
                hover:bg-purple-700

                px-8
                py-4

                rounded-xl

                font-semibold

                transition
              "
              onClick={onTrailerOpen}
            >
              ▶ Watch Trailer
            </button>

            <button
              onClick={handleWatchlist}
              disabled={watchlistLoading}
              className="px-6 py-3 bg-purple-600 rounded-lg"
            >
              {watchlistLoading ? "Loading..." : "❤️ Watchlist"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieHero;
