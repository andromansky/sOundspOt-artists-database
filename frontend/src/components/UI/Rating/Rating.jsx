import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import StarsRating from 'react-star-rate';
import { addRating } from '../../../storeAndSlices/Slices/userReducer';
import './Rating.css';

function Rating({ user }) {
  const [rating, setRating] = useState();
  const { data: sessionUser, hasUser } = useSelector((state) => state.authState);
  const { id } = useParams();
  const dispatch = useDispatch();

  const countRating = (data) => {
    const ratingSum = data
      .map((obj) => obj.rating)
      .reduce((curr, prev) => curr + prev, 0);
    return (ratingSum / data.length).toFixed(1);
  };

  useEffect(() => {
    if (user && user.Ratings) {
      setRating(countRating(user.Ratings));
    } else if (sessionUser && sessionUser.Ratings) {
      setRating(countRating(sessionUser.Ratings));
    }
  }, [user]);

  const handleChange = (value) => {
    dispatch(addRating({ id: Number(id), rating: value }));
  };

  return (
    <StarsRating
      count={7}
      value={rating}
      disabled={!!(user && user.id === sessionUser.id) || !hasUser}
      onChange={handleChange}
    />
  );
}

export default Rating;
