import { useRef } from "react";
import MovieCard from "./MovieCard";

const MovieSection = ({
  title,
  movies,
  showRemoveButton = false,
  onRemove,
}) => {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      //scrollBy ak built in method ha jo scroll karne ka liya use hota ha
      left: -500, //500 pixels left move karo.
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: 500,
      behavior: "smooth",
    });
  };
  if (!movies?.length) return null;
  return (
    <section className="py-12" >
      <div className="container mx-auto px-6">
        {/* Header */}

        <div className="flex items-center justify-between mb-6">
          <h2
            className="
            text-3xl 
            font-bold 
            text-white
          "
          >
            {title}
          </h2>

          <button
            className="
            text-purple-400
            hover:text-purple-300
            "
          >
            View All →
          </button>
        </div>

        {/* Slider Wrapper */}

        <div className="relative">
          {/* Left Button */}

          <button
            onClick={scrollLeft}
            className="
            absolute
            left-0
            top-1/2
            -translate-y-1/2
            z-10

            bg-black/70
            text-white
            w-10
            h-10
            rounded-full

            hover:bg-purple-600
            transition
            "
          >
            ❮
          </button>

          {/* Movies */}

          <div
            ref={sliderRef}
            className="
            flex
            gap-6
            overflow-x-auto
            scroll-smooth

            scrollbar-hide
            px-12
            "
          >
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="
                  min-w-[220px]
                  "
              >
                <MovieCard
                  key={movie._id || movie.tmdbId}
                  movie={movie}
                  showRemoveButton={showRemoveButton}
                  onRemove={onRemove}
                />
              </div>
            ))}
          </div>

          {/* Right Button */}

          <button
            onClick={scrollRight}
            className="
            absolute
            right-0
            top-1/2
            -translate-y-1/2
            z-10

            bg-black/70
            text-white
            w-10
            h-10
            rounded-full

            hover:bg-purple-600
            transition
            "
          >
            ❯
          </button>
        </div>
      </div>
    </section>
  );
};

export default MovieSection;
