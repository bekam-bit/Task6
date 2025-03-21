import axios from "axios";
import { useState, useEffect, useMemo, useCallback } from "react";

const FetchApi = () => {
  const API_URL =
    "https://api.themoviedb.org/3/movie/popular?api_key=99c519bfc3c45ec32e1abe06ab1d8733";
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(API_URL);
        setMovies(res.data.results);//store the fetched data
        console.log(res.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const addToWatchList = useCallback(
    (movie) => {
      if (!watchList.some((item) => item.id === movie.id)) {//checks if the movies exist on the watchlist page
        setWatchList((prevList) => [...prevList, movie]);
      }
    },
    [watchList]
  );

  const removeFromWatchList = useCallback(
    (id) => {
      setWatchList((prevList) => prevList.filter((item) => item.id !== id));//remove the added list
    },
    [watchList]
  );

  const memorizedWatchList = useMemo(() => watchList, [watchList]);

  return (
    <div className="movies-container">
      <h1>Popular Movies</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="movie-list">
          {movies.map((movie) => (
            <div className="movie-containers" key={movie.id}>
              <span className="movie-container1">{movie.title}</span>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <span className="movie-date-container">{movie.release_date}</span>
              <span className="overview-container">{movie.overview}</span>
              <button
                className="btn-movie1"
                onClick={() => addToWatchList(movie)}
                disabled={watchList.some((item) => item.id === movie.id)}
              >
                {watchList.some((item) => item.id === movie.id)
                  ? "Added"
                  : "Add to Watchlist"}
              </button>
            </div>
          ))}
        </div>
      )}

      <h2>My Watch List</h2>
      {memorizedWatchList.length > 0 ? (
        <div className="watch-list">
          {" "}
          {/* Apply grid to this wrapper */}
          {memorizedWatchList.map((item) => (
            <div className="watch-list-container" key={item.id}>
              <span>{item.title}</span>
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title}
              />
              <span className="movie-date-container">{item.release_date}</span>
              <span className="overview-container">{item.overview}</span>
              <button
                className="btn-movie2"
                onClick={() => removeFromWatchList(item.id)}
              >
                Remove from Watchlist
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No movies in your watch list.</p>
      )}
    </div>
  );
};

export default FetchApi;
