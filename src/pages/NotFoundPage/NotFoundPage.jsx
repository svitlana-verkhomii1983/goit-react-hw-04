import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1>Page not found</h1>
      <Link to="/">Go to HomePage</Link>
    </div>
  );
};

export default NotFoundPage;