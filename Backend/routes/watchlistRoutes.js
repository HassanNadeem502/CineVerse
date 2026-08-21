import express from "express";

import {
  toggleWatchlist,
  getUserWatchlist,
} from "../controllers/watchlistController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add / Remove Watchlist
router.post("/", protect, toggleWatchlist);

// Get Logged-in User Watchlist
router.get("/", protect, getUserWatchlist);

export default router;
