import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import MovieHero from "../components/movie/MovieHero";
import MovieOverview from "../components/movie/MovieOverview";
import CastSection from "../components/movie/CastSection";
import MovieSection from "../components/movie/MovieSection";
import TrailerModal from "../components/movie/TrailerModal";
import {
  getMovieDetails,
  getMovieCredits,
  getSimilarMovies,
  getMovieTrailer,
} from "../services/movieService";

const MovieDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const movieId =
    id ??//"Jo pehli value null ya undefined na ho, usi ko use kar lo."
    location.state?.movie?.id ??
    location.state?.movie?.tmdbId ??
    location.state?.movie?._id;

  const [movie, setMovie] = useState(location.state?.movie ?? null);

  const [cast, setCast] = useState([]);

  const [similarMovies, setSimilarMovies] = useState([]);

  const [trailerKey, setTrailerKey] = useState("");
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  const [loading, setLoading] = useState(!location.state?.movie);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      if (!movieId) {
        setError("Movie not found.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        // Fetch all data in parallel
        const [movieData, creditsData, similarData, trailerData] =
          await Promise.all([
            getMovieDetails(movieId),
            getMovieCredits(movieId),
            getSimilarMovies(movieId),
            getMovieTrailer(movieId),
          ]);

        // TMDB returns video results inside an object
        const trailer = trailerData.find(
          (video) => video.site === "YouTube" && video.type === "Trailer",
        );
        // Update states
        setMovie(movieData);
        setCast(creditsData.cast || []);
        setSimilarMovies(similarData || []);

        if (trailer) {
          setTrailerKey(trailer.key);
        } else {
          setTrailerKey("");
        }
      } catch (err) {
        console.error("Failed to fetch movie details:", err);
        setError("Unable to load movie details right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (loading) {
    return <div className="text-white p-10">Loading...</div>;
  }

  if (error || !movie) {
    return <div className="text-white p-10">{error || "Movie not found."}</div>;
  }

  const IMAGE_URL = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <main className="bg-black min-h-screen">
      <MovieHero movie={movie} onTrailerOpen={() => setIsTrailerOpen(true)} />
      <TrailerModal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        trailerKey={trailerKey}
      />
      <MovieOverview overview={movie.overview} />

      <CastSection cast={cast} />
      <MovieSection title="Similar Movies" movies={similarMovies} />
    </main>
  );
};

export default MovieDetails;
