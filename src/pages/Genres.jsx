import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MovieCard from "./MovieCard";
import useLoading from "../hooks/useLoading";
import LoadingScreen from './LoadingScreen';

export default function Genres() {
  const { id } = useParams();
  const [shows, setShows] = useState([]);
   const{loading,startLoading,stopLoading}=useLoading()

  useEffect(() => {
    const fetchShows = async () => {
      try {
        startLoading()
        const res = await axios.get(
          `https://api.themoviedb.org/3/discover/tv?api_key=9813ce01a72ca1bd2ae25f091898b1c7&with_genres=${id}`
        );
        setShows(res.data.results);
      } catch (err) {
        stopLoading()
        console.error(err);
      } finally {
        stopLoading()
      }
    };

    fetchShows();
  }, [id]);


  return <>
  {loading ? <LoadingScreen /> : (    <div className="container p-4">
      <div className="row g-3">
        {shows.map((show) => (
          <MovieCard
            key={show.id}
            type="tv"
            id={show.id}
            poster_path={show.poster_path}
            original_title={show.original_name} 
            overview={show.overview}
            vote_average={show.vote_average}
          />
        ))}
      </div>
    </div>)}

      </>

}

