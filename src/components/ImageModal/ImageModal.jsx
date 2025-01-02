import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import styles from './ImageModal.module.css';

Modal.setAppElement('#root');

function ImageModal({ data, onClose }) {
  const { urls, user, description, likes } = data;

  return (
    <Modal
      isOpen={!!data}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <button onClick={onClose} className={styles.closeButton}>X</button>
      <img src={urls.regular} alt={description} className={styles.image} />
      <div className={styles.details}>
        <h2>{description || 'No Description'}</h2>
        <p>Author: {user.name}</p>
        <p>Likes: {likes}</p>
      </div>
    </Modal>
  );
}

ImageModal.propTypes = {
  data: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImageModal;