import React, { useState, useEffect } from 'react';
import { useParams, Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import fetchMovieDetails from '../../api';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const backLink = location.state?.from || '/movies';

  useEffect(() => {
    if (!movieId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchMovieDetails(movieId);
        setMovieData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(backLink)}>Go back</button>
      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {movieData && (
        <div className={styles.movieDetails}>
          <img
            src={
              movieData.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`
                : 'https://via.placeholder.com/250'
            }
            width={250}
            alt="poster"
          />
          <h2>{movieData.title}</h2>
          <p>{movieData.overview}</p>
          <Link to="cast" state={{ from: location.state }}>Cast</Link>
          <Link to="reviews" state={{ from: location.state }}>Reviews</Link>
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;