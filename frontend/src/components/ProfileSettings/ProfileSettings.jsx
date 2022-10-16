import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ProfileSettings.css';
import { changeProfile, disableHelpMessage } from '../../storeAndSlices/Slices/authReducer';
import ChangeUserPhoto from '../ChangeUserPhoto/ChangeUserPhoto';
import Dragger from '../Dragger/Dragger';

function ProfileSettings() {
  const { data: user, helpMessage, hasUser } = useSelector((state) => state.authState);

  const [show, setShow] = useState(false);
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  function changeSubmit(event) {
    event.preventDefault();
    const changeData = {
      id: user.id,
      login: event.target.changeLogin.value,
      email: event.target.changeEmail.value,
      password: event.target.changePassword.value,
    };
    dispatch(changeProfile(changeData));
  }
  useEffect(() => () => dispatch(disableHelpMessage()), [dispatch]);

  useEffect(() => {
    if (user) {
      setLogin(user.login);
      setEmail(user.email);
    }
  }, [hasUser]);

  return (
    <div className="profile-settings-gallery">
      <div className="profile-settings">
        <form onSubmit={changeSubmit}>
          <div className="prof-set-inputs">
            <input className="prof-settings-input" type="text" name="changeLogin" placeholder="login" autoComplete="off" value={login} onChange={(e) => setLogin(e.target.value)} />
            <input className="prof-settings-input" type="email" name="changeEmail" placeholder="email" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="prof-settings-input" type="password" name="changePassword" placeholder="change password" autoComplete="off" />
          </div>
          <div className="prof-settings-message">
            {helpMessage && <div className="setting-help-text">{helpMessage}</div>}
          </div>
          <button className="prof-settings-button" type="submit">Edit profile</button>
        </form>

      </div>

      <div className="change-location">
        {/* <img src="http://www.hellopiter.ru/image/ssdhhhsjasdq.jpg" alt="1" width={350} height={400} /> */}
        {user.id && <Dragger user={user} />}
      </div>
      <div className="editphoto">
        {user && (
          <div className="user-img-container">
            <img className="user-img-change" src={user.photo} alt={user.login} />
          </div>
        )}
        <button className="edit-photo-button" type="button" onClick={() => setShow(true)}>Edit photo</button>
        {show && <ChangeUserPhoto show={show} setShow={setShow} />}
      </div>
    </div>
  );
}

export default ProfileSettings;
