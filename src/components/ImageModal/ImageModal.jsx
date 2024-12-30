import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import styles from './ImageModal.module.css';
import { FaTimes } from 'react-icons/fa';

Modal.setAppElement('#root');

const ImageModal = ({ isOpen, onClose, image }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isOpen && image) {
      const index = image.index;
      setCurrentIndex(index);
    }
  }, [isOpen, image]);

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleNext = () => {
    if (currentIndex < image.total - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  if (!image) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      onClick={handleOverlayClick}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <div className={styles.header}>
        <span className={styles.photoInfo}>{`${currentIndex + 1}/${image.total}`}</span>
        <button className={styles.closeButton} onClick={onClose}>
          <FaTimes />
        </button>
      </div>
      <img src={image.urls.regular} alt={image.alt_description} className={styles.image} />
      <div className={styles.navigation}>
        {currentIndex > 0 && (
          <button className={styles.navButton} onClick={handlePrev}>
            &larr;
          </button>
        )}
        {currentIndex < image.total - 1 && (
          <button className={styles.navButton} onClick={handleNext}>
            &rarr;
          </button>
        )}
      </div>
    </Modal>
  );
};

ImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  image: PropTypes.object,
};

export default ImageModal;