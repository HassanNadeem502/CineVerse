import { Link } from "react-router-dom";

const MovieCard = ({ movie, showRemoveButton = false, onRemove }) => {
  const movieId = movie?.id ?? movie?.tmdbId ?? movie?._id;
  const IMAGE_URL = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <>
      <Link to={`/movie/${movieId}`} state={{ movie }} className="group block">
        <div
          className="
        group
        cursor-pointer
        transition-all
        duration-300
        hover:-translate-y-2
      "
        >
          {/* Poster */}
          <div
            className="
          relative
          overflow-hidden
          rounded-2xl
          shadow-xl
          bg-zinc-900
        "
          >
            <img
              src={IMAGE_URL}
              alt={movie.title}
              className="
            w-full
            h-[420px]
            object-cover
            transition-transform
            duration-500
            group-hover:scale-110
          "
            />

            {/* Gradient Overlay */}
            <div
              className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black
            via-black/60
            to-transparent
            opacity-0
            group-hover:opacity-100
            transition-all
            duration-500
          "
            />

            {/* Rating */}
            <div
              className="
            absolute
            top-3
            left-3
            bg-yellow-400
            text-black
            px-3
            py-1
            rounded-full
            text-sm
            font-bold
            shadow-lg
          "
            >
              ⭐ {movie.vote_average?.toFixed(1)}
            </div>

            {/* Watchlist Button */}
            <button
              className="
            absolute
            top-3
            right-3
            w-10
            h-10
            rounded-full
            bg-white/20
            backdrop-blur-md
            text-white
            opacity-0
            group-hover:opacity-100
            transition-all
            duration-500
            hover:bg-purple-600
            hover:scale-110
          "
            >
              +
            </button>

            {/* Hover Content */}
            <div
              className="
            absolute
            inset-0
            flex
            flex-col
            justify-end
            p-5
            opacity-0
            group-hover:opacity-100
            transition-all
            duration-500
          "
            >
              <button
                className="
              w-full
              bg-purple-600
              hover:bg-purple-700
              text-white
              py-3
              rounded-xl
              font-semibold
              transition-all
              duration-300
              hover:scale-105
              mb-4
            "
              >
                ▶ Watch Now
              </button>

              <p
                className="
              text-gray-300
              text-sm
              line-clamp-3
            "
              >
                {movie.overview}
              </p>
            </div>
          </div>

          {/* Movie Info */}
          <div className="mt-4 space-y-2">
            <h3
              className="
            text-white
            text-lg
            font-bold
            line-clamp-1
            group-hover:text-purple-400
            transition-colors
          "
            >
              {movie.title}
            </h3>

            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>{movie.release_date?.slice(0, 4)}</span>

              <span className="text-yellow-400 font-medium">
                ⭐ {movie.vote_average?.toFixed(1)}
              </span>
            </div>

            {showRemoveButton && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(movie.tmdbId);
                }}
                className="mt-4 w-full rounded-lg bg-red-600 py-2 text-white transition hover:bg-red-700"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </Link>
    </>
  );
};

export default MovieCard;
