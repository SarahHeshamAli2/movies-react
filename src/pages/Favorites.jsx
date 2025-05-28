import { useState } from "react";
import { Link } from "react-router-dom";

export default function Favorites() {
  const [favoriteMovies, setFavoriteMovies] = useState(
    JSON.parse(localStorage.getItem("favoriteMovies")) || []
  );

  const removeFromFavorites = (idToRemove) => {
    const updated = favoriteMovies.filter((movie) => movie.id !== idToRemove);
    localStorage.setItem("favoriteMovies", JSON.stringify(updated));
    setFavoriteMovies(updated);
  };

  return (
    <div className="container my-5">
      <h2 className="text-white mb-4">🎬 My Favorite Movies</h2>

      {favoriteMovies.length === 0 ? (
   <div className="text-center text-white py-5">
    <i className="fa-solid fa-film fa-4x text-secondary mb-4"></i>
    <h3 className="mb-3">No Favorites Yet</h3>
    <p className="mb-4">You haven’t added any movies to your favorites list. Start exploring and add some!</p>
    <Link to="/" className="btn btn-primary px-4 py-2">
      <i className="fa-solid fa-magnifying-glass me-2"></i>
      Discover Movies
    </Link>
  </div>
      ) : (
        <div className="row g-4">
          {favoriteMovies.map((movie) => (
            <div
              key={movie.id}
              className="col-md-4 col-lg-3"
            >
              <div
                className="inner-col aspect-[2/3] w-full"
                style={{
                  backgroundColor: "#252525",
                  padding: "15px",
                  borderRadius: "12px",
                  color: "white",
                  boxShadow: "0 0 10px rgba(0,0,0,0.5)",
                  transition: "transform 0.3s ease",
                  height: "100%",
                }}
              >
                {movie.poster_path ? (
                  <Link to={`/movie/${movie.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                      alt={movie.original_title}
                      className="img-fluid w-100 rounded mb-2"
                      height="450"
                      style={{ borderRadius: "10px" }}
                    />
                  </Link>
                ) : (
                  <div
                    className="d-flex flex-column justify-content-center align-items-center text-white text-center rounded"
                    style={{
                      width: "100%",
                      height: "450px",
                      background: "linear-gradient(135deg, #222, #444)",
                      border: "1px solid #555",
                    }}
                  >
                    <i className="fa-solid fa-clapperboard fa-3x mb-3 text-secondary"></i>
                    <p className="fw-bold mb-1">No Poster</p>
                    <small className="text-muted">Coming Soon</small>
                  </div>
                )}

                <h5 className="mt-2">{movie.original_title || movie.name}</h5>
         

                <button
                  onClick={() => removeFromFavorites(movie.id)}
                  className="btn btn-outline-danger btn-sm mt-2 w-100"
                >
                  <i className="fa-solid fa-trash me-2"></i>
                  Remove from Favorites
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
