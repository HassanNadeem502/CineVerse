import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Ek user ek movie sirf ek baar add kar sakta hai
watchlistSchema.index(
  { user: 1, movie: 1 },
  { unique: true }
);

const Watchlist = mongoose.model("Watchlist", watchlistSchema);

export default Watchlist;