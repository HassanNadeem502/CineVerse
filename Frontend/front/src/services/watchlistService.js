const BASE_URL = "https://cineversebackend1-686lr7gq.b4a.run/api/v1/watchlist";

// Toggle Watchlist
export const toggleWatchlist = async (movieId) => {
  const token = localStorage.getItem("token");

  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ movieId }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update watchlist.");
  }

  return data;
};

// Get User Watchlist
export const getUserWatchlist = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch watchlist.");
  }

  return data.data;
};
