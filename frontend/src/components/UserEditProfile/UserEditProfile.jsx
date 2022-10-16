/* eslint-disable no-promise-executor-return */
/* eslint-disable arrow-parens */
/* eslint-disable max-len */
/* eslint-disable no-return-assign */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './UserEditProfile.css';
import { updateAsyncUserProfile } from '../../storeAndSlices/Slices/usersReducer';

function UserEditProfile({ onHide }) {
  const dispatch = useDispatch();
  const { instruments, genres, users } = useSelector((store) => store.usersState);
  const { data: user } = useSelector((state) => state.authState);
  const [filters, setFilters] = useState([]);
  const [filtersGenre, setFiltersGenre] = useState([]);

  const [inputTextArea, setInputTextArea] = useState('');
  const [inputContact, setInputContact] = useState('');

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

  const handleUserEditSubmit = () => {
    onHide();
    dispatch(updateAsyncUserProfile({ filters, filtersGenre, inputContact, inputTextArea, user }));
  };

  useEffect(() => {
    setInputTextArea(user.about);
    setInputContact(user.contact);
    if (user && users.some((el) => el.id === user.id)) {
      const thisUser = users.find((el) => el.id === user.id);
      let instrArr = Array.from({ length: instruments.length });
      let genreArr = Array.from({ length: genres.length });
      instrArr = instrArr.map((el, i) => thisUser?.extraStuff.hisInstruments.includes(instruments[i].instrument));
      genreArr = genreArr.map((el, i) => thisUser?.extraStuff.hisGenres.includes(genres[i].genre));
      setFiltersGenre(genreArr);
      setFilters(instrArr);
    } else {
      document.location.assign('/profile');
    }
  }, [users]);

  useEffect(() => {
    document.querySelectorAll('.instrumentFilter').forEach((btn, i) => filters[i]
      ? btn.className = 'btn btn-secondary instrumentFilter'
      : btn.className = 'btn btn-outline-secondary instrumentFilter');
    document.querySelectorAll('.genreFilter').forEach((btn, i) => filtersGenre[i]
      ? btn.className = 'btn btn-danger genreFilter'
      : btn.className = 'btn btn-outline-danger genreFilter');
  }, [filters, filtersGenre]);

  return (
    <Modal
      onHide={onHide}
      show
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="soundSpot__userEditProfile_modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit profile...
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="tagsContainer">
          <div className="instrumentsTags">
            <h4>Choose instruments:</h4>
            {instruments
              ? instruments.map((instrument) =>
                <button id={instrument.id} type="button" key={instrument.id} onClick={handleInstrumentFilter} className="btn btn-outline-secondary instrumentFilter">{instrument.instrument}</button>)
              : null}
          </div>
          <div className="genresTags">
            <h4>Choose genres:</h4>
            {genres
              ? genres.map((genre) =>
                <button id={genre.id} type="button" key={genre.id} onClick={handleGenreFilter} className="btn btn-outline-danger genreFilter">{genre.genre}</button>)
              : null}
          </div>
        </div>
        {user && (
        <>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon3">
              t.me/your_telegram
            </InputGroup.Text>
            <Form.Control id="basic-url" aria-describedby="basic-addon3" autoComplete="off" value={inputContact} onChange={(e) => setInputContact(e.target.value)} />
          </InputGroup>
          <h4>Tell us something about yourself:</h4>
          <textarea className="form-control" id="aboutUser" rows="7" autoComplete="off" value={inputTextArea} onChange={(e) => setInputTextArea(e.target.value)} />
        </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button className="soundSpot__editProfile_submitButton" onClick={handleUserEditSubmit}>Submit changes</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UserEditProfile;
