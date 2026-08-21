const MovieOverview = ({ overview }) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="text-3xl font-bold text-white mb-6">
          Overview
        </h2>

        <p
          className="
            text-gray-300
            text-lg
            leading-8
          "
        >
          {overview}
        </p>
      </div>
    </section>
  );
};

export default MovieOverview;