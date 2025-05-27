import axios from "axios";
import { useEffect, useState, useRef } from "react";
import useLoading from "../hooks/useLoading";
import LoadingScreen from "./LoadingScreen";
import MovieCard from "./MovieCard";
import SearchInput from "../components/SearchInput";
import { API_KEY, BASE_URL } from "../services/urls";
import noMovie from '../assets/noMovies.png'

export default function Movies() {
  const [moviesList, setMoviesList] = useState([]);
  const { loading, startLoading, stopLoading } = useLoading();
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  // Ref to hold debounce timer ID
  const debounceTimeout = useRef(null);

  // Debounced search function passed to SearchInput
  const searchByMovie = (term) => {
    // Clear the previous timer if it exists
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // If input empty, reset
    if (term.trim() === "") {
      setIsFiltered(false);
      setFilteredMovies([]);
      return;
    }

    // Set new debounce timer
    debounceTimeout.current = setTimeout(() => {
      axios
        .get(`${BASE_URL}/search/movie?${API_KEY}&query=${term}`)
        .then((res) => {
          setFilteredMovies(res.data.results);
          setIsFiltered(true);
        })
        .catch((err) => console.error(err));
    }, 500);
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        startLoading();
        const res = await axios.get(
          `${BASE_URL}/discover/movie?sort_by=popularity.desc&${API_KEY}`,
          { signal: controller.signal }
        );
        setMoviesList(res.data.results);
      } catch (error) {
        if (error.name !== "CanceledError") {
          console.error("Error fetching movies:", error);
        }
      } finally {
        stopLoading();
      }
    };

    fetchMovies();

    return () => controller.abort();
  }, [startLoading, stopLoading]);

  useEffect(() => {
    if (isFiltered && filteredMovies.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [filteredMovies, isFiltered]);

  return (
    <>
      {loading ? (
        <LoadingScreen
          count={moviesList.length}
          meduimScreen={4}
          largeScreen={3}
        />
      ) : (
        <div className="container p-4">
          <SearchInput searchByMovie={searchByMovie} />

          {isFiltered && filteredMovies.length === 0 ? (
            <div className="text-center mt-5">
              <img
                src={noMovie}
                alt="No results"
                style={{ maxWidth: "400px", width: "100%" }}
                className="img-fluid"
              />
              <h4 className="text-white mt-3">Please search with another film.</h4>
            </div>
          ) : (
            <div className="row g-3">
              {(isFiltered ? filteredMovies : moviesList).map((movie) => (
                <MovieCard key={movie.id} {...movie} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
