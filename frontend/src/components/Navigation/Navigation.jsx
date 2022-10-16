import React, { useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Navigation.css';
import { useDispatch, useSelector } from 'react-redux';
import { FiSettings } from 'react-icons/fi';
import SoundSpotLogo from '../UI/SoundSpotLogo/SoundSpotLogo';
import { loadSessionUser, logoutUser } from '../../storeAndSlices/Slices/authReducer';

function Navigation() {
  const dispatch = useDispatch();
  const check = ({ isActive }) => isActive ? 'active-class' : 'navigation__item';
  const { hasUser } = useSelector((state) => state.authState);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadSessionUser());
  }, [hasUser]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <div className="navigation">
      <ul className="navigation__list">
        <div className="navigation__logo-container navigation__container">
          <li><Link className={check} to="/"><SoundSpotLogo /></Link></li>
        </div>
        {
          hasUser
            ? (
              <>
                <div className="navigation__menu-container navigation__container">
                  <li><NavLink className={check} to="/home">Home</NavLink></li>
                  <li><NavLink className={check} to="/profile">My profile</NavLink></li>
                  <li><NavLink className={check} to="/bands">Bands</NavLink></li>
                  <li><NavLink className={check} to="/artists">Artists</NavLink></li>
                  <li><NavLink className={check} to="/spots">Spots</NavLink></li>
                  <li><NavLink className={check} to="/music">My music</NavLink></li>
                  <li><NavLink className={check} to="/profilesettings"><FiSettings /></NavLink></li>
                </div>
                <div className="navigation__logout-container navigation__container">
                  <li><NavLink onClick={handleClick} className={check} to="/signout">Sign Out</NavLink></li>
                </div>
              </>
            )
            : (
              <>
                <div className="navigation__menu-container navigation__container">
                  <li><NavLink className={check} to="/home">Home</NavLink></li>
                  <li><NavLink className={check} to="/bands">Bands</NavLink></li>
                  <li><NavLink className={check} to="/artists">Artists</NavLink></li>
                  <li><NavLink className={check} to="/spots">Spots</NavLink></li>
                </div>
                <div className="navigation__sign-container navigation__container">
                  <li><NavLink className={check} to="/signup">Sign Up</NavLink></li>
                  <li><NavLink className={check} to="/signin">Sign In</NavLink></li>
                </div>
              </>
            )
        }
      </ul>
    </div>
  );
}

export default Navigation;
