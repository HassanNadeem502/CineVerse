import { useEffect, useState } from "react";

import HeroBanner from "../components/hero/HeroBanner";
import MovieSection from "../components/movie/MovieSection";

import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../services/movieService";

const Home = () => {
  // State

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  // ===========================
  // Fetch Trending Movies
  // ===========================

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [trending, popular, topRated, upcoming] = await Promise.all([
          getTrendingMovies(),
          getPopularMovies(),
          getTopRatedMovies(),
          getUpcomingMovies(),
        ]);

        setTrendingMovies(trending);
        setPopularMovies(popular);
        setTopRatedMovies(topRated);
        setUpcomingMovies(upcoming);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  // ===========================
  // Auto Hero Slider
  // ===========================

  useEffect(() => {
    if (!trendingMovies.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === trendingMovies.length - 1 ? 0 : prev + 1,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [trendingMovies]);

  // ===========================
  // Slider Controls
  // ===========================

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === trendingMovies.length - 1 ? 0 : prev + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? trendingMovies.length - 1 : prev - 1,
    );
  };

  // ===========================
  // JSX
  // ===========================

  return (
    <main className="bg-black min-h-screen">
      <HeroBanner
        movie={trendingMovies[currentIndex]}
        movies={trendingMovies}
        currentIndex={currentIndex}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
        setCurrentIndex={setCurrentIndex}
      />

      <MovieSection title="Trending Movies" movies={trendingMovies} />

      <MovieSection title="Popular Movies" movies={popularMovies} />

      <MovieSection title="Top Rated Movies" movies={topRatedMovies} />

      <MovieSection title="Upcoming Movies" movies={upcomingMovies} />
    </main>
  );
};

export default Home;
