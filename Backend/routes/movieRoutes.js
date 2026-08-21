import express from "express";
import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getMovieDetails,
  getMovieCredits,
  getSimilarMovies,
  getMovieTrailer,
   searchMovies,
} from "../controllers/movieController.js";

const router = express.Router();

router.get("/trending", getTrendingMovies);
router.get("/popular", getPopularMovies);
router.get("/top-rated", getTopRatedMovies);
router.get("/upcoming", getUpcomingMovies);
router.get("/search", searchMovies);
// Details
router.get("/:id", getMovieDetails);

// Credits
router.get("/:id/credits", getMovieCredits);

// Similar
router.get("/:id/similar", getSimilarMovies);

// Trailer
router.get("/:id/videos", getMovieTrailer);

export default router;
