import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://cine-verse-fcap3bu9o-hassannadeem502s-projects.vercel.app",
  "https://cine-verse-4rr2-git-main-hassannadeem502s-projects.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/watchlist", watchlistRoutes);

export default app;
