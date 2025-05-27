// useGenres.js
import axios from "axios";
import { API_KEY, BASE_URL } from "../services/urls";

export default function useGenresFetcher() {
  const fetchGenres = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/genre/tv/list?${API_KEY}`);
      return res.data.genres || [];
    } catch (error) {
      console.error("Error fetching genres:", error);
      return [];
    }
  };

  return fetchGenres;
}
