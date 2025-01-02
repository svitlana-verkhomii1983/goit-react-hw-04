import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import ImageGallery from '../../components/ImageGallery/ImageGallery';
import Loader from '../../components/Loader/Loader';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import fetchImages from '../../api';
import styles from './MoviesPage.module.css';

const MoviesPage = ({ onImageClick }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setLoading(true);
      try {
          const data = await fetchImages(query, page);
           console.log('API Response:', data); 
        setImages(prevImages => [...prevImages, ...data.results]);
        setIsLastPage(data.total_pages && page >= data.total_pages);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, page]);

  const handleSearchSubmit = newQuery => {
    setImages([]);
    setPage(1);
    setError(null);
    setSearchParams({ query: newQuery });
  };

  const handleLoadMore = () => setPage(prevPage => prevPage + 1);

  const isLoadMoreVisible = images.length > 0 && !loading && !isLastPage && !error;

  // Логирование перед возвратом JSX
  console.log('Render conditions:', {
    imagesLength: images.length,
    isLoading: loading,
    isError: !!error,
    isLastPage,
    isLoadMoreVisible,
  });

  return (
    <div className={styles.container}>
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={onImageClick} />
      {loading && <Loader />}
      {isLoadMoreVisible && <LoadMoreBtn onClick={handleLoadMore} />}
    </div>
  );
};

export default MoviesPage;