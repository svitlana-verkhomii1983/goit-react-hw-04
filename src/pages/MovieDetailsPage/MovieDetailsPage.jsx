import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation, Outlet, Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import styles from './MovieDetailsPage.module.css';

const defaultImg = "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLink = useRef(location.state?.from ?? '/movies');
  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieDetails = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(`https://api.example.com/movie/${movieId}`);
        setMovieData(response.data);
      } catch (error) {
        setError('Failed to fetch movie details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  return (
    <div className={styles.container}>
      <Link to={backLink.current} className={styles.backLink}>Go back</Link>
      {error && <ErrorMessage message={error} />}
      {isLoading ? (
        <Loader />
      ) : (
        movieData && (
          <div className={styles.movieDetails}>
            <img
              src={
                movieData.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`
                  : defaultImg
              }
              width={250}
              alt="poster"
            />
            <div>
              <h2>{movieData.title}</h2>
              <p>{movieData.overview}</p>
            </div>
          </div>
        )
      )}
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;