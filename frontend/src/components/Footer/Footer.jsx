import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div className="soundSpot__footer">
      <div className="soundSpot__footer left">
        <div className="soundSpot__footer soundSpot__footer_ul">
          <li className="soundSpot__footer soundSpot__footer_li">{' '}</li>
          <li className="soundSpot__footer soundSpot__footer_li">Developed by Andrii Domanskyi</li>
          <li className="soundSpot__footer soundSpot__footer_li">{' '}</li>
        </div>
      </div>
      <div className="soundSpot__footer right">
        Odessa, 2022 ©
      </div>
    </div>
  );
}

export default Footer;
