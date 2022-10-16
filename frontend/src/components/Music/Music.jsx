import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddMusicModal from '../AddMusicModal/AddMusicModal';
import Demo from '../Demo/Demo';
import Player from '../Player/Player';
import { loadSessionUser } from '../../storeAndSlices/Slices/authReducer';
import './Music.css';

function Music() {
  const [value, setValue] = useState('');
  const [show, setShow] = useState(false);
  const [player, setPlayer] = useState(false);
  const [song, setSong] = useState('');
  const { data: user } = useSelector((state) => state.authState);
  const { delMusicStatus } = useSelector((state) => state.userState);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSessionUser());
  }, [delMusicStatus]);

  return (
    <div className="demo-cont">
      {show && <AddMusicModal show={show} setShow={setShow} user={user} />}
      <button type="button" onClick={() => navigate(-1)} className="back-button soundSpot__myMusic_backButton">Move Back</button>
      {player && <Player className="player" src={`/${song}`} onEndPlay={() => setPlayer(false)} />}

      <div className="demos-cont">
        <input className="soundSpot__userDemos form-control" type="text" placeholder="Search..." onChange={(e) => setValue(e.target.value)} />
        <div className="demos-box">
          {user
            && user.UserDemos
            && user.UserDemos.length
            ? (
              user.UserDemos
                && user.UserDemos
                  .filter((demo) => demo.demoTitle.toLowerCase().includes(value.toLowerCase()))
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
            )}
        </div>
      </div>
      <button className="add-demo-btn soundSpot__myMusic_addButton" type="button" onClick={() => setShow(true)}>Add demos</button>
    </div>
  );
}

export default Music;
