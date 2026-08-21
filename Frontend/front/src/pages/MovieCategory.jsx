import { useEffect, useState } from "react";
import MovieCard from "../components/movie/MovieCard";

const MovieCategory = ({ title, fetchMovies }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await fetchMovies();
        setMovies(data || []);
      } catch (err) {
        console.error(err);
        setError("Unable to load movies right now.");
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [fetchMovies]);

  return (
    <main className="min-h-screen bg-black">
      <section className="container mx-auto px-6 py-12">
        <h1 className="mb-8 text-4xl font-bold text-white">{title}</h1>

        {loading && <p className="text-gray-400">Loading movies...</p>}

        {error && !loading && <p className="text-red-400">{error}</p>}

        {!loading && !error && movies.length === 0 && (
          <p className="text-gray-400">No movies found.</p>
        )}

        {!loading && !error && movies.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {movies.map((movie) => (
              <MovieCard key={movie.id || movie.tmdbId || movie._id} movie={movie} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default MovieCategory;
