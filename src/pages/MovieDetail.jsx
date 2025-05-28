import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import useLoading from "../hooks/useLoading";
import LoadingScreen from "./LoadingScreen";
import { API_KEY, BASE_URL } from "../services/urls";

export default function MediaDetail() {
  // Load from localStorage or set to empty array
  const favorites = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
  const [favoritMovies, setFavoritMovies] = useState(favorites);
  const [alreadyInFav, setAlreadyInFav] = useState(false);

  const { id, type } = useParams();
  const [media, setMedia] = useState(null);
  const { loading, startLoading, stopLoading } = useLoading();

  // Check if media is already in favorites when media or favorites change
  useEffect(() => {
    if (media) {
      const isFav = favoritMovies.some((movie) => movie.id === media.id);
      setAlreadyInFav(isFav);
    }
  }, [media, favoritMovies]);

  // Save updated favorites to localStorage
  useEffect(() => {
    localStorage.setItem("favoriteMovies", JSON.stringify(favoritMovies));
  }, [favoritMovies]);

  // Toggle favorite (add or remove)
  const toggleFavorite = (media) => {
    if (alreadyInFav) {
      const updatedFavorites = favoritMovies.filter((movie) => movie.id !== media.id);
      setFavoritMovies(updatedFavorites);
      setAlreadyInFav(false);
    } else {
      setFavoritMovies([...favoritMovies, media]);
      setAlreadyInFav(true);
    }
  };

  // Fetch media details
  const getMediaById = async () => {
    try {
      startLoading();
      const res = await axios.get(`${BASE_URL}/${type}/${id}?${API_KEY}`);
      setMedia(res.data);
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    getMediaById();
  }, [id, type]);

  // Loading or not found states
  if (loading) return <LoadingScreen count={1} meduimScreen={3} detail={true} />;
  if (!media) return <p>Not found.</p>;

  return (
    <div className="container my-4">
      <div className="card shadow-lg p-4 cute-card">
        <div className="row g-4 align-items-center ">
          <div className="col-md-3 text-center">
            <img
              src={`https://image.tmdb.org/t/p/w342${media.poster_path}`}
              alt={type === "movie" ? media.title : media.name}
              className="img-fluid rounded cute-img w-100"
              loading="lazy"
            />
          </div>

          <div className="col-md-8">
            <h2 className="text-primary">
              {type === "movie" ? media.title : media.name}
            </h2>
            <h6 className="text-muted mb-3 fst-italic">{media.tagline}</h6>
            <p className="text-secondary">{media.overview}</p>
            <div className="mt-3">
              <p>
                <strong>{type === "movie" ? "Release Date:" : "First Air Date:"}</strong>{" "}
                {type === "movie" ? media.release_date : media.first_air_date}
              </p>
              <p>
                <strong>Rating:</strong> ⭐ {media.vote_average} / 10
              </p>
              {media.homepage && (
                <Link to={media.homepage} className="d-flex gap-3 align-items-center" target="_blank" rel="noopener noreferrer">
                  <i className="fa-solid fa-play"></i>
                  <p className="fs-5 m-0 fw-bold">Trailer</p>
                </Link>
              )}

              <button
                onClick={() => toggleFavorite(media)}
                className={`btn mt-3 ${alreadyInFav ? "btn-success" : "btn-outline-primary"}`}
                style={{ minWidth: "160px" }}
              >
                {alreadyInFav ? "Remove From Favorites ❌" : "Add to Favorites ➕"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
