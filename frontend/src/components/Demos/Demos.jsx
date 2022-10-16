import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { loadAsyncBand } from '../../storeAndSlices/Slices/bandsReducer';
import { loadUser } from '../../storeAndSlices/Slices/userReducer';
import Demo from '../Demo/Demo';
import Player from '../Player/Player';
import './Demos.css';

function Demos() {
  const [value, setValue] = useState('');
  const [player, setPlayer] = useState(false);
  const [song, setSong] = useState('');
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.userState);
  const { band } = useSelector((state) => state.bandsState);

  useEffect(() => {
    if (pathname.includes('bands')) {
      dispatch(loadAsyncBand(id));
    } else {
      dispatch(loadUser(id));
    }
  }, [pathname]);

  return (
    <div className="user-demo-cont">
      <button type="button" onClick={() => navigate(-1)} className="back-button soundSpot__addUser_backButton">Move Back</button>
      {player && <Player className="player" src={`/${song}`} onEndPlay={() => setPlayer(false)} />}
      <div className="demo-container">
        <input className="search-input" type="text" placeholder="Search..." onChange={(e) => setValue(e.target.value)} />
        <div className="demos-box">
          {pathname.includes('bands')
            ? (
              band
              && band.BandDemos
              && band.BandDemos.length
                ? (
                  band.BandDemos
                  && band.BandDemos
                    .filter((demo) => demo.songTitle.toLowerCase().includes(value.toLowerCase()))
                    .map((demo) => (
                      <Demo
                        key={demo.id}
                        demo={demo}
                        owner={band}
                        setPlayer={setPlayer}
                        setSong={setSong}
                      />
                    ))
                )
                : (
                  <div className="no-musics-title">No demos yet</div>
                )
            ) : (
              user
              && user.UserDemos
              && user.UserDemos.length
                ? (
                  user.UserDemos
                  && user.UserDemos
                    .filter((demo) => demo.demoFile.toLowerCase().includes(value.toLowerCase()))
                    .map((demo) => (
                      <Demo
                        key={demo.id}
                        demo={demo}
                        owner={user}
                        setPlayer={setPlayer}
                        setSong={setSong}
                      />
                    ))
                )
                : (
                  <div className="no-musics-title">No demos yet</div>
                )
            )}
        </div>
      </div>
    </div>
  );
}

export default Demos;
