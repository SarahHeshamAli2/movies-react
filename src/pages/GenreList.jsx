import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard"; // reusable
import useLoading from "../hooks/useLoading";
import LoadingScreen from "./LoadingScreen";

export default function GenreMediaList() {
  const { type, genreId } = useParams(); // movie or tv + genreId
  const [items, setItems] = useState([]);
  const [genreName, setGenreName] = useState("");
  const { loading, startLoading, stopLoading } = useLoading();

  const fetchGenreName = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/genre/${type}/list?api_key=9813ce01a72ca1bd2ae25f091898b1c7`
      );
      const found = res.data.genres.find((g) => g.id.toString() === genreId);
      setGenreName(found?.name || "Unknown");
    } catch (err) {
      console.error("Error fetching genre name:", err);
    }
  };

  const fetchMediaByGenre = async () => {
    try {
      startLoading();
      const res = await axios.get(
        `https://api.themoviedb.org/3/discover/${type}?api_key=9813ce01a72ca1bd2ae25f091898b1c7&with_genres=${genreId}`
      );
      setItems(res.data.results);
    } catch (err) {
      console.error("Error fetching genre media:", err);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    fetchGenreName();
    fetchMediaByGenre();
  }, [type, genreId]);

  if (loading) return <LoadingScreen count={6} />;

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-primary">{genreName} {type === "movie" ? "Movies" : "TV Shows"}</h2>
      <div className="row g-4">
        {items.map((item) => (
          <MovieCard
            key={item.id}
            id={item.id}
            type={type} // ✅ Needed for navigation
            poster_path={item.poster_path}
            original_title={item.title || item.name}
            overview={item.overview}
            vote_average={item.vote_average}
          />
        ))}
      </div>
    </div>
  );
}
