import Watchlist from "../models/Watchlist.js";
import Movie from "../models/Movie.js";

export const toggleWatchlist = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const { movieId } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Missing user information.",
      });
    }

    if (!movieId) {
      return res.status(400).json({
        success: false,
        message: "Movie ID is required.",
      });
    }

    // 🔥 Find movie by TMDB ID
    const movie = await Movie.findOne({ tmdbId: movieId });

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found.",
      });
    }

    // Check if already in watchlist
    const existingWatchlist = await Watchlist.findOne({
      user: userId,
      movie: movie._id,
    });

    // Remove if exists
    if (existingWatchlist) {
      await Watchlist.findByIdAndDelete(existingWatchlist._id);

      return res.status(200).json({
        success: true,
        action: "removed",
        message: "Movie removed from watchlist.",
      });
    }

    // Add if not exists
    const watchlist = await Watchlist.create({
      user: userId,
      movie: movie._id,
    });

    res.status(201).json({
      success: true,
      action: "added",
      message: "Movie added to watchlist.",
      data: watchlist,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update watchlist.",
    });
  }
};

// ===============================
// Get User Watchlist
// ===============================
export const getUserWatchlist = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Missing user information.",
      });
    }

    const watchlist = await Watchlist.find({
      user: userId,
    }).populate("movie");

    res.status(200).json({
      success: true,
      data: watchlist,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch watchlist.",
    });
  }
};