import React from 'react';
import './RootPage.css';

function RootPage({ children }) {
  return (
    <div className="soundSpot__rootPage">
      <div className="soundSpot__rootPage_left">
        <div className="soundSpot__begining">
          <div className="soundSpot__begining-slogan">Service for musicians</div>
          <div className="soundSpot__begining-gap"> </div>
        </div>
        <div className="soundSpot__ending">
          <div className="soundSpot__ending-gap"> </div>
          <div className="soundSpot__ending-slogan">from musicians.</div>
        </div>
      </div>
      <div className="soundSpot__rootPage_right">
        {children}
      </div>
    </div>
  );
}

export default RootPage;
