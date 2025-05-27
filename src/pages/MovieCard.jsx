import { memo } from "react";
import { Link } from "react-router-dom";

function MovieCard({
  id,
  type = "movie",
  poster_path,
  original_title,
  overview,
  vote_average,
  isGenre = false,
  name,
 
}) {
  if (isGenre) {
    return (
      <Link to={`/genre/${type}/${id}`} className="col-md-4 col-lg-3 movies" style={{ maxWidth: '300px' }}>
        <div className="inner-col aspect-[2/3] w-full" style={{
          backgroundColor: 'rgb(37, 37, 37)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          cursor: 'pointer',
          textAlign: 'center'
        }}>
          <h3>{name}</h3>
          <p style={{ color: '#a5a5a5', fontSize: '0.9rem' }}>
            Explore {name} {type === "movie" ? "movies" : "TV shows"}
          </p>
        </div>
      </Link>
    );
  }

  return <>


    <Link to={`/${type}/${id}`} className="col-md-4 col-lg-3 movies" style={{ maxWidth: '300px' }}>
      <div className="inner-col aspect-[2/3] w-full">
       {poster_path ? (
  <img
    src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
    alt={original_title}
    className="img-fluid rounded"
    width="300"
    height="450"
    loading="lazy"
  />
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

        <h3>{original_title}</h3>
        <p>{overview?.split(" ").slice(0, 10).join(" ") || "Fallback text."}</p>
        <span>
          <i className="fa-solid fa-star text-warning"></i> {vote_average}
        </span>
      </div>
    </Link>
</>

  
}
export default memo(MovieCard);
