import { useEffect, useState } from "react";
import MovieSection from "../components/movie/MovieSection";
import {
  getUserWatchlist,
  toggleWatchlist,
} from "../services/watchlistService";

const Watchlist = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Watchlist
  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const data = await getUserWatchlist();

        // Backend returns:
        // [
        //   {
        //     user: "...",
        //     movie: { ...movie }
        //   }
        // ]

        const movieList = data.map((item) => item.movie);

        setMovies(movieList);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, []);

  // Remove Movie
  const handleRemove = async (movieId) => {
    try {
      await toggleWatchlist(movieId);

      setMovies((prevMovies) =>
        prevMovies.filter((movie) => movie.tmdbId !== movieId)
      );
    } catch (error) {
      console.error(error);
      alert("Failed to remove movie.");
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <h2 className="text-white text-2xl font-bold">
          Loading Watchlist...
        </h2>
      </div>
    );
  }

  // Empty State
  if (movies.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white">
            Your Watchlist is Empty ❤️
          </h2>

          <p className="text-gray-400 mt-4">
            Start adding your favorite movies.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-black min-h-screen pt-24 px-6">
      <MovieSection
        title="My Watchlist"
        movies={movies}
        showRemoveButton={true}
        onRemove={handleRemove}
      />
    </main>
  );
};

export default Watchlist;