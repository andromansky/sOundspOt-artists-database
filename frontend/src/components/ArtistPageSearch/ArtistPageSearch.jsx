/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-return-assign */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Image from 'react-bootstrap/Image';
import InputGroup from 'react-bootstrap/InputGroup';
import './ArtistPageSearch.css';
import { loadAsyncUsers, updateAsyncUsersList } from '../../storeAndSlices/Slices/usersReducer';
import WarningModal from '../WarningModal/WarningModal';

function ArtistPageSearch() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { users, instruments, genres } = useSelector((store) => store.usersState);
  const { hasUser, data } = useSelector((store) => store.authState);
  const [filters, setFilters] = useState([]);
  const [filtersGenre, setFiltersGenre] = useState([]);
  const [orderByRating, setOrderByRating] = useState(false);
  const [orderByName, setOrderByName] = useState(false);
  const [inputText, setInputText] = useState('');
  const [show, setShow] = useState(false);

  const handleInstrumentFilter = (e) => {
    const copy = [...filters];
    copy[(+e.target.id) - 1] = !copy[(+e.target.id) - 1];
    setFilters(copy);
  };

  const handleGenreFilter = (e) => {
    const copy = [...filtersGenre];
    copy[(+e.target.id) - 1] = !copy[(+e.target.id) - 1];
    setFiltersGenre(copy);
  };

  const handleSearchInput = (e) => {
    const input = e.target.value;
    setInputText(input);
  };

  const handleOrderByRating = () => {
    setOrderByRating((prev) => !prev);
    setOrderByName(false);
  };

  const handleOrderByName = () => {
    setOrderByName((prev) => !prev);
    setOrderByRating(false);
  };

  const highLight = (search, string) => {
    if (!search) return string;
    const regexp = new RegExp(`${search}`, 'ig');
    const matchValues = string.match(regexp);
    if (matchValues) {
      return string.split(regexp).map((str, ind, arr) => {
        const match = matchValues.shift();
        if (ind < arr.length - 1) {
          return (
            <>
              {str}
              <span className="yellowBack">{match}</span>
            </>
          );
        }
        return str;
      });
    }
    return string;
  };

  const handleClick = (user) => {
    if (hasUser && user.id !== data.id) {
      navigate(`/artists/${user.id}`);
    } if (user.id === data.id) {
      navigate('/profile');
    } else {
      setShow(true);
    }
  };

  useEffect(() => {
    document.querySelectorAll('.instrumentFilter').forEach((btn, i) => filters[i]
      ? btn.className = 'btn btn-secondary instrumentFilter'
      : btn.className = 'btn btn-outline-secondary instrumentFilter');
    document.querySelectorAll('.genreFilter').forEach((btn, i) => filtersGenre[i]
      ? btn.className = 'btn btn-danger genreFilter'
      : btn.className = 'btn btn-outline-danger genreFilter');
    dispatch(updateAsyncUsersList({ filters, filtersGenre, orderByRating, orderByName, inputText }));
  }, [filters, filtersGenre, orderByRating, orderByName, inputText]);

  useEffect(() => () => dispatch(loadAsyncUsers()), [location]);

  return (
    <div className="soundSpot__artistSearch-container">
      {show && <WarningModal show={show} setShow={setShow} />}
      <InputGroup className="mb-3 soundSpot__input-search">
        <Form.Control onChange={handleSearchInput} value={inputText} aria-label="Text input with dropdown button" placeholder="Search..." />
        <DropdownButton
          variant="outline-secondary"
          title="Order by..."
          id="input-group-dropdown-2"
          align="end"
        >
          <Dropdown.Item as="button" onClick={handleOrderByRating}>{orderByRating ? '+ Rating' : '- Rating'}</Dropdown.Item>
          <Dropdown.Item as="button" onClick={handleOrderByName}>{orderByName ? '+ Name' : '- Name'}</Dropdown.Item>
        </DropdownButton>
      </InputGroup>
      <div className="searchContainer">
        <div className="artistsList">
          {users
            ? users.map((user) => (
              <div key={user.id} className="stringOnSearchPage" onClick={() => handleClick(user)}>
                <Image roundedCircle className="d-block w-100 searchImage" src={user.photo} alt="photo" />
                <div className="userinfoOnSearchPage">
                  <div className="userinfoTop">
                    {inputText
                  && (
                  <p className="soundSpot__username">
                    {' '}
                    {highLight(inputText, user.login)}
                  </p>
                  )}
                    {!inputText && (
                    <p className="soundSpot__username">
                      {' '}
                      {user.login}
                    </p>
                    )}
                    {user.extraStuff.hisInstruments.length && (
                    <p>
                      {' Instruments: '}
                      {user.extraStuff.hisInstruments.join(', ')}
                    </p>
                    )}
                  </div>
                  <div className="userinfoBottom">
                    {user.extraStuff.averageRating && (
                    <p>
                      {'Rating: '}
                      {+(user.extraStuff.averageRating).toFixed(2)}
                      {' ('}
                      {user.extraStuff.numberOfVoters}
                      {user.extraStuff.numberOfVoters > 1
                        ? (<span>{' rates)'}</span>
                        ) : (<span>{' rate)'}</span>)}
                    </p>
                    )}
                    {user.extraStuff.hisGenres.length ? (
                      <p>
                        {'Genres: '}
                        {user.extraStuff.hisGenres.join(', ')}
                      </p>
                    ) : ' '}
                  </div>
                </div>
              </div>
            ))
            : (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
        </div>
        <div className="soundSpot_tagsContainer">
          <div className="instrumentsTags">
            {instruments
              ? instruments.map((instrument) =>
                <button id={instrument.id} type="button" key={instrument.id} onClick={handleInstrumentFilter} className="btn btn-outline-secondary instrumentFilter">{instrument.instrument}</button>)
              : null}
          </div>
          <div className="genresTags">
            {genres
              ? genres.map((genre) =>
                <button id={genre.id} type="button" key={genre.id} onClick={handleGenreFilter} className="btn btn-outline-danger genreFilter">{genre.genre}</button>)
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtistPageSearch;
