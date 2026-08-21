import { useRef } from "react";
import CastCard from "./CastCard";

const CastSection = ({ cast }) => {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -500,

      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: 500,

      behavior: "smooth",
    });
  };
  if (!cast?.length) return null;
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h2
            className="
              text-3xl
              font-bold
              text-white
            "
          >
            Top Cast
          </h2>
        </div>

        <div className="relative">
          <button
            onClick={scrollLeft}
            className="
              absolute
              left-0
              top-1/2
              -translate-y-1/2
              z-10

              w-10
              h-10

              rounded-full

              bg-black/70

              text-white

              hover:bg-purple-600
            "
          >
            ❮
          </button>

          <div
            ref={sliderRef}
            className="
              flex
              gap-8
              overflow-x-auto
              scroll-smooth
              scrollbar-hide
              px-12
            "
          >
            {cast.slice(0, 15).map((actor) => (
              <CastCard key={actor.cast_id ?? actor.credit_id} actor={actor} />
            ))}
          </div>

          <button
            onClick={scrollRight}
            className="
              absolute
              right-0
              top-1/2
              -translate-y-1/2
              z-10

              w-10
              h-10

              rounded-full

              bg-black/70

              text-white

              hover:bg-purple-600
            "
          >
            ❯
          </button>
        </div>
      </div>
    </section>
  );
};

export default CastSection;
