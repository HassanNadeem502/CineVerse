const BASE_URL =
  "https://cineverse-production-47da.up.railway.app/api/v1/movies";

// ===============================
// Trending Movies
// ===============================
export const getTrendingMovies = async () => {
  const response = await fetch(`${BASE_URL}/trending`);

  if (!response.ok) {
    throw new Error("Failed to fetch trending movies");
  }

  const data = await response.json();

  return data.data;
};

// ===============================
// Popular Movies
// ===============================
export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/popular`);

  if (!response.ok) {
    throw new Error("Failed to fetch popular movies");
  }

  const data = await response.json();

  return data.data;
};

// ===============================
// Top Rated Movies
// ===============================
export const getTopRatedMovies = async () => {
  const response = await fetch(`${BASE_URL}/top-rated`);

  if (!response.ok) {
    throw new Error("Failed to fetch top rated movies");
  }

  const data = await response.json();

  return data.data;
};

// ===============================
// Upcoming Movies
// ===============================
export const getUpcomingMovies = async () => {
  const response = await fetch(`${BASE_URL}/upcoming`);

  if (!response.ok) {
    throw new Error("Failed to fetch upcoming movies");
  }

  const data = await response.json();

  return data.data;
};

// ===============================
// Movie Details
// ===============================
export const getMovieDetails = async (movieId) => {
  const response = await fetch(`${BASE_URL}/${movieId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }

  const data = await response.json();

  return data.data;
};

// ===============================
// Movie Credits
// ===============================
export const getMovieCredits = async (movieId) => {
  const response = await fetch(`${BASE_URL}/${movieId}/credits`);

  if (!response.ok) {
    throw new Error("Failed to fetch movie credits");
  }

  const data = await response.json();

  return data.data;
};

// ===============================
// Similar Movies
// ===============================
export const getSimilarMovies = async (movieId) => {
  const response = await fetch(`${BASE_URL}/${movieId}/similar`);

  if (!response.ok) {
    throw new Error("Failed to fetch similar movies");
  }

  const data = await response.json();

  return data.data;
};

// ===============================
// Movie Trailer
// ===============================
export const getMovieTrailer = async (movieId) => {
  const response = await fetch(`${BASE_URL}/${movieId}/videos`);

  if (!response.ok) {
    throw new Error("Failed to fetch movie trailer");
  }

  const data = await response.json();

  return data.data;
};

// ===============================
// Search Movies
// ===============================
export const searchMovies = async (query) => {
  const response = await fetch(
    `https://cineverse-production-47da.up.railway.app/api/v1/movies/search?query=${encodeURIComponent(query)}`,
  );

  if (!response.ok) {
    throw new Error("Failed to search movies.");
  }

  const data = await response.json();

  return data.data;
};
