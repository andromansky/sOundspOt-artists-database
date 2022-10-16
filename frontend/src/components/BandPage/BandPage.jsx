/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { loadAsyncBand } from '../../storeAndSlices/Slices/bandsReducer';
import './BandPage.css';

function BandPage() {
  const { band } = useSelector((state) => state.bandsState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const rightPath = (path) => {
    const newpath = path.slice(0, 4) === 'http' ? path : `/${path}`;
    return newpath;
  };

  useEffect(() => {
    dispatch(loadAsyncBand(Number(id)));
  }, []);

  return (
    <div className="band-page-gallery">
      <div className="band-page-left">
        <div className="name-band-and-move-back">
          <div className="band-name"><p>{band && band.name}</p></div>
          <div className="button-move-back" onClick={() => navigate(-1)}>Move Back</div>
        </div>
        <div className="band-photo"><img className="band-photo-img" src={rightPath(band.photo)} alt={band && band.name} /></div>
      </div>
      <div className="band-page-right">
        <div className="aboutBand__container">
          <div className="biography"><p>Biography</p></div>
          <div className="band-about">{band && band.about}</div>
        </div>

        <div className="band-page-genres">
          <p>Genres:</p>
          {band && band.BandGenres.map((el) => <p className="users-genres" key={el.id}>{el.Genre.genre}</p>)}
        </div>
        <div className="band-members">
          <p>Members:</p>
          {band && band.UserBands.map((el) => (
            <p className="users-band" key={el.id} onClick={() => navigate(`/artists/${el.userId}`)}>
              {el.User.login}
            </p>
          ))}
          <div className="band-checkout-demos">
            Checkout our demos
            {' '}
            <Link to={`/bands/${band && band.id}/music`} className="band-checkout-demos-link">here</Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default BandPage;
