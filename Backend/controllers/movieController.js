import { fetchFromTMDB } from "../services/tmdbService.js";
import { getMoviesByCategory } from "../utils/movieHelper.js";

// =====================================
// Trending Movies
// =====================================
export const getTrendingMovies = async (req, res) => {
  try {
    const movies = await getMoviesByCategory(
      "/trending/movie/week",
      "trending",
    );

    res.status(200).json({
      success: true,
      data: movies,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch trending movies.",
    });
  }
};

// =====================================
// Popular Movies
// =====================================
export const getPopularMovies = async (req, res) => {
  try {
    const movies = await getMoviesByCategory("/movie/popular", "popular");

    res.status(200).json({
      success: true,
      data: movies,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch popular movies.",
    });
  }
};

// =====================================
// Top Rated Movies
// =====================================
export const getTopRatedMovies = async (req, res) => {
  try {
    const movies = await getMoviesByCategory("/movie/top_rated", "top-rated");

    res.status(200).json({
      success: true,
      data: movies,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch top rated movies.",
    });
  }
};

// =====================================
// Upcoming Movies
// =====================================
export const getUpcomingMovies = async (req, res) => {
  try {
    const movies = await getMoviesByCategory("/movie/upcoming", "upcoming");

    res.status(200).json({
      success: true,
      data: movies,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch upcoming movies.",
    });
  }
};

// =====================================
// Movie Details
// =====================================
export const getMovieDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await fetchFromTMDB(`/movie/${id}`);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch movie details.",
    });
  }
};

// =====================================
// Movie Credits
// =====================================
export const getMovieCredits = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await fetchFromTMDB(`/movie/${id}/credits`);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch movie credits.",
    });
  }
};

// =====================================
// Similar Movies
// =====================================
export const getSimilarMovies = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await fetchFromTMDB(`/movie/${id}/similar`);

    res.status(200).json({
      success: true,
      data: data.results,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch similar movies.",
    });
  }
};

// =====================================
// Movie Trailer
// =====================================
export const getMovieTrailer = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await fetchFromTMDB(`/movie/${id}/videos`);

    res.status(200).json({
      success: true,
      data: data.results,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch movie trailer.",
    });
  }
};

//-------------------Search Api--------------//
// ===============================
// Search Movies
// ===============================
export const searchMovies = async (req, res) => {
  try {
    const { query } = req.query;

    // Agar search empty ho
    if (!query || query.trim() === "") {
      return res.status(200).json({
        success: true,
        data: [],
      });
    }

    const data = await fetchFromTMDB(
      `/search/movie?query=${encodeURIComponent(query.trim())}`,
    );

    res.status(200).json({
      success: true,
      data: data.results || [],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to search movies.",
    });
  }
};
