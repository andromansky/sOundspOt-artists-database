/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Rating from '../UI/Rating/Rating';
import UserEditProfile from '../UserEditProfile/UserEditProfile';
import { loadSessionUser } from '../../storeAndSlices/Slices/authReducer';
import './Profile.css';
import plus from '../../icons/icons8-plus.svg';
import CreateBand from '../CreateBand/CreateBand';

function Profile() {
  const dispatch = useDispatch();
  const { data: user, hasUser } = useSelector((state) => state.authState);
  const { users } = useSelector((state) => state.usersState);
  const [modalShow, setModalShow] = useState(false);
  const [modalBand, setModalBand] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadSessionUser());
  }, [users]);

  return (
    <div className="profile-container">
      <div className="left-prof-box">
        <div className="name-rating-box">
          <div className="soundSpot__username">{hasUser && user?.login}</div>
          <div className="soundSpot_rating-container">
            <Rating user={user} />
          </div>
          <div type="button" className="soundSpot__editProfileTag" onClick={() => setModalShow(true)}>Edit Profile</div>
          {modalShow && <UserEditProfile onHide={() => setModalShow(false)} />}
        </div>
        <div className="soundSpot_profileInfo-container">
          <div className="upper-inf-box">
            <div className="inf-box">
              <h5>My genres</h5>
              <p className="profile-inf-genres">
                {hasUser && user?.UserGenres
                && user.UserGenres.length > 0
                && user.UserGenres.map((data) => <p className="profile-inf-genres" key={data.id}>{data.Genre.genre}</p>)}
              </p>
            </div>
            <div className="inf-box">
              <h5>My Instruments</h5>
              <p className="profile-inf-instr">
                {hasUser && user?.UserInstruments
                && user.UserInstruments.length > 0
                && user.UserInstruments.map((data) => <p className="profile-inf-instr" key={data.id}>{data.Instrument.instrument}</p>)}
              </p>
            </div>
            <div className="inf-box-bands">
              <h5>
                My Bands
                <img className="plus-button" src={plus} onClick={() => setModalBand(true)} alt="1" />
              </h5>
              {modalBand && <CreateBand onHide={() => setModalBand(false)} />}
              <p className="profile-inf-band">
                {user?.UserBands
                && user.UserBands.length > 0
                && user.UserBands.map((data) => <p className="profile-inf-bands" key={data.id} onClick={() => navigate(`/bands/${data.Band.id}`)}>{data.Band.name}</p>)}
              </p>
            </div>
            <div className="inf-box-tg">
              <h5>Contact me:</h5>
              <p className="profile-inf">
                <a href={`https://${hasUser && user?.contact}`} target="_blank" rel="noreferrer" className="user-checkout-contact-link">{hasUser && user?.contact}</a>
              </p>
            </div>
          </div>
        </div>
        <div className="lower-inf-box">
          <div className="soundSpot_profile-about">
            <h5>About</h5>
            <p className="profile-inf-about">{hasUser && user?.about}</p>
          </div>
        </div>
      </div>
      <div className="right-box">
        {hasUser && <div className="profile-img-box"><img className="user-img" src={user?.photo} alt={user?.login} /></div>}
      </div>
    </div>
  );
}

export default Profile;
