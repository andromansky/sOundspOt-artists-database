import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { regUser, disableHelpMessage } from '../../storeAndSlices/Slices/authReducer';
import './Registration.css';

function Registration() {
  const dispatch = useDispatch();
  const { hasUser, helpMessage } = useSelector((state) => state.authState);
  const navigate = useNavigate();

  // удаление helpMessage при размонтировании компонента
  useEffect(() => () => {
    dispatch(disableHelpMessage());
  }, [dispatch]);

  function regSubmit(event) {
    event.preventDefault();
    const data = {
      login: event.target.regLogin.value,
      email: event.target.regEmail.value,
      password: event.target.regPassword.value,
      photo: 'https://upload.wikimedia.org/wikipedia/commons/4/48/BLANK_ICON.png'
    };
    dispatch(regUser(data));
  }

  useEffect(() => {
    if (hasUser) {
      document.location.assign('/home');
    }
  }, [hasUser, navigate]);

  return (
    <div className="log-reg-div">
      <div>
        <form className="log-reg-form" onSubmit={regSubmit}>
          <div className="input-flex">
            <input className="log-reg-input" type="text" name="regLogin" placeholder="login" autoComplete="off" />
            <input className="log-reg-input" type="email" name="regEmail" placeholder="email" autoComplete="off" />
            <input className="log-reg-input" type="password" name="regPassword" placeholder="password" autoComplete="off" />
          </div>
          <div className="reg-message">
            {helpMessage && <div className="help-text">{helpMessage}</div>}
          </div>
          <button className="log-reg-button" type="submit">Sign Up</button>
        </form>
      </div>
      <div className="sign-in-div">
        <p className="have-account">
          Already have an account?
          {' '}
          <NavLink className="soundSpot__navlinktoSignIn" to="/signin">Sign In</NavLink>
        </p>
      </div>

    </div>
  );
}

export default Registration;
