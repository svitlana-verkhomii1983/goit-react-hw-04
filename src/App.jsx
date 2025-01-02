import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import MovieDetailsPage from './pages/MovieDetailsPage/MovieDetailsPage';
import MoviesPage from './pages/MoviesPage/MoviesPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ImageModal from './components/ImageModal/ImageModal';
import './App.css';

function App() {
  const [modalData, setModalData] = useState(null);

  const handleImageClick = (data) => {
    setModalData(data);
  };

  const handleCloseModal = () => {
    setModalData(null);
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage onImageClick={handleImageClick} />} />
          <Route path="/movies" element={<MoviesPage onImageClick={handleImageClick} />} />
          <Route path="/movies/:id" element={<MovieDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {modalData && <ImageModal data={modalData} onClose={handleCloseModal} />}
      </div>
    </Router>
  );
}

export default App;