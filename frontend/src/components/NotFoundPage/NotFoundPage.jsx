import React from 'react';
import './NotFoundPage.css';
import { TbError404 } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="error-page-cont">
      <div className="button-box">
        <button type="button" className="error-btn" onClick={() => navigate(-1)}>Move Back</button>
      </div>
      <div className="error-box">
        <TbError404 size={300} color="#BE1111" className="error-ikon" />
        <p className="error-message">We are sorry but the page you are looking for does not exist.</p>
      </div>
    </div>
  );
}

export default NotFoundPage;
