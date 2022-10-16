import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import './LoadingSpinnert.css';

function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <Spinner animation="border" role="status" className="loading-spinner">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default LoadingSpinner;
