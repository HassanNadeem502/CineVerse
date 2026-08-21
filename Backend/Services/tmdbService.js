import { TMDB_API_KEY, TMDB_BASE_URL } from "../config/tmdb.js";

const defaultHeaders = {
  accept: "application/json",
};

export const fetchFromTMDB = async (endpoint) => {
  const baseUrl = TMDB_BASE_URL || "https://api.themoviedb.org/3";
  const apiKey = TMDB_API_KEY || process.env.TMDB_API_KEY;

  if (!apiKey) {
    console.warn("TMDB API key is not configured. Returning empty result set.");
    return { results: [] };
  }

  try {
    const separator = endpoint.includes("?") ? "&" : "?";
    const response = await fetch(`${baseUrl}${endpoint}${separator}api_key=${apiKey}`, {
      method: "GET",
      headers: defaultHeaders,
    });

    if (!response.ok) {
      console.warn(
        `TMDB request failed with status ${response.status} for ${endpoint}`,
      );
      return { results: [] };
    }

    return await response.json();
  } catch (error) {
    console.warn(`TMDB request failed for ${endpoint}: ${error.message}`);
    return { results: [] };
  }
};
