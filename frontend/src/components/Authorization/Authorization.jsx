import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { loginUser, disableHelpMessage } from '../../storeAndSlices/Slices/authReducer';
import './Authorization.css';

function Authorization() {
  const dispatch = useDispatch();
  const { hasUser, helpMessage } = useSelector((state) => state.authState);
  // const navigate = useNavigate();

  // удаление helpMessage при размонтировании компонента
  useEffect(() => () => {
    dispatch(disableHelpMessage());
  }, [dispatch]);

  function loginSubmit(event) {
    event.preventDefault();
    const data = {
      email: event.target.logEmail.value,
      password: event.target.logPassword.value,
    };
    dispatch(loginUser(data));
  }

  useEffect(() => {
    if (hasUser) {
      document.location.assign('/home');
    }
  }, [hasUser]);

  return (
    <div className="log-reg-div">
      <div>
        <form className="log-reg-form" onSubmit={loginSubmit}>
          <div className="input-flex">
            <input className="log-reg-input" type="email" name="logEmail" placeholder="email" autoComplete="off" />
            <input className="log-reg-input" type="password" name="logPassword" placeholder="password" autoComplete="off" />
          </div>
          <div className="reg-message">
            {helpMessage && <div className="help-text">{helpMessage}</div>}
          </div>
          <button className="log-reg-button" type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default Authorization;
