import {
  FiPlay,
  FiPlus,
  FiChevronLeft,
  FiChevronRight,
  FiStar,
} from "react-icons/fi";

const HeroBanner = ({
  movie,
  movies,
  currentIndex,
  nextSlide,
  prevSlide,
  setCurrentIndex,
}) => {
  if (!movie) {
    return (
      <section className="h-screen bg-[#0B1120] flex items-center justify-center">
        <h1 className="text-white text-3xl font-bold animate-pulse">
          Loading...
        </h1>
      </section>
    );
  }

  const backdropURL = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  return (
    <section className="relative h-[600px] overflow-hidden md:h-[650px] bg-[#0B1120]">
      {/* Background */}
      <div
        className="absolute inset-0 hero-bg bg-cover bg-center"
        style={{
          backgroundImage: `url(${backdropURL})`,
        }}
      />

      {/* Subtle overlay just to keep text readable, image stays clear */}
      <div className="absolute inset-0 bg-black/25"></div>

      {/* Left-side gradient for text contrast only — right side of image stays fully visible */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B1120] via-[#0B1120]/60 to-transparent"></div>

      {/* Thin bottom fade so hero blends into the page below */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto h-full px-6 pb-24 lg:px-16">
        <div className="flex h-full items-center">
          <div className="max-w-3xl hero-content">
            {/* Badge */}
            <span className="inline-flex items-center bg-[#7C3AED] text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              🔥 Trending Now
            </span>

            {/* Title */}
            <h1 className="line-clamp-2 text-4xl font-black leading-[1.05] text-white drop-shadow-2xl md:text-6xl lg:text-7xl">
              {movie.title}
            </h1>

            {/* Movie Info */}
            <div className="flex flex-wrap items-center gap-6 mt-6 text-[#D1D5DB]">
              <span className="flex items-center gap-1 text-yellow-400 font-bold">
                <FiStar className="fill-yellow-400" size={16} />
                {movie.vote_average.toFixed(1)}
              </span>

              <span>{movie.release_date}</span>

              <span className="uppercase">{movie.original_language}</span>
            </div>

            {/* Description */}
            <p className="mt-6 max-w-2xl line-clamp-3 text-base leading-7 text-[#D1D5DB] md:text-lg md:leading-8">
              {movie.overview}
            </p>

            {/* Buttons */}
            <div className="mt-5 flex flex-wrap gap-3 md:gap-5">
              <button
                className="
                  flex items-center gap-2
                  bg-[#7C3AED]
                  hover:bg-[#6D28D9]
                  hover:scale-105
                  active:scale-95
                  transition-all
                  duration-300
                  px-6
                  py-3
                  rounded-xl
                  font-semibold
                  text-white
                  shadow-2xl
                  shadow-[#7C3AED]/30
                "
              >
                <FiPlay size={18} />
                Play Now
              </button>

              <button
                className="
                  flex items-center gap-2
                  border
                  border-white/20
                  bg-white/5
                  backdrop-blur-md
                  hover:bg-white
                  hover:text-black
                  hover:scale-105
                  active:scale-95
                  transition-all
                  duration-300
                  px-6
                  py-3
                  rounded-xl
                  font-semibold
                  text-white
                "
              >
                <FiPlus size={18} />
                Add to Watchlist
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Previous */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md border border-white/10 transition-all duration-300 hover:bg-[#7C3AED] hover:border-[#7C3AED] md:flex lg:left-6"
      >
        <FiChevronLeft size={22} />
      </button>

      {/* Next */}
      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md border border-white/10 transition-all duration-300 hover:bg-[#7C3AED] hover:border-[#7C3AED] md:flex lg:right-6"
      >
        <FiChevronRight size={22} />
      </button>

      {/* Slider Dots */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2 md:bottom-10 md:gap-3">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all duration-300 rounded-full ${
              currentIndex === index
                ? "w-8 h-3 bg-[#7C3AED]"
                : "w-3 h-3 bg-white/40 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;
