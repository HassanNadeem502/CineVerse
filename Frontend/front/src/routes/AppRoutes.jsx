import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import VerifyEmail from "../pages/VerifyEmail";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Profile from "../pages/Profile";
import MovieDetails from "../pages/MovieDetails";
import Watchlist from "../pages/Watchlist";
import MovieCategory from "../pages/MovieCategory";
import {
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
  getUpcomingMovies,
} from "../services/movieService";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route
        path="/movies"
        element={<MovieCategory title="Movies" fetchMovies={getPopularMovies} />}
      />
      <Route
        path="/trending"
        element={
          <MovieCategory title="Trending Movies" fetchMovies={getTrendingMovies} />
        }
      />
      <Route
        path="/popular"
        element={<MovieCategory title="Popular Movies" fetchMovies={getPopularMovies} />}
      />
      <Route
        path="/upcoming"
        element={<MovieCategory title="Upcoming Movies" fetchMovies={getUpcomingMovies} />}
      />
      <Route
        path="/top-rated"
        element={
          <MovieCategory title="Top Rated Movies" fetchMovies={getTopRatedMovies} />
        }
      />
      <Route path="/watchlist" element={<Watchlist />} />
    </Routes>
  );
};

export default AppRoutes;
