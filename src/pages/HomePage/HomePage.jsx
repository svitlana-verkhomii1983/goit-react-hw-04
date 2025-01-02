import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import ImageGallery from '../../components/ImageGallery/ImageGallery';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import fetchImages from '../../api';

function HomePage({ onImageClick }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchImages(query);
      setImages(data.results);
    } catch (error) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      {images.length > 0 && <ImageGallery images={images} onImageClick={onImageClick} />}
      {loading && <Loader />}
    </div>
  );
}

export default HomePage;