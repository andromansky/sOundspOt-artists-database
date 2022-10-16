import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Spinner from 'react-bootstrap/Spinner';
import Image from 'react-bootstrap/Image';
import { loadAsyncSpot } from '../../storeAndSlices/Slices/spotsReducer';
import './SpotPage.css';

function SpotPage() {
  const { spot } = useSelector((state) => state.spotsState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(loadAsyncSpot(Number(id)));
  }, []);

  return (
    <div className="spot-page-gallery">
      <div className="spot-page-left">
        <div className="spot-name"><p>{spot && spot.name}</p></div>
        <div className="spot-description-header"><p>Description</p></div>
        <div className="spot-description"><p>{spot && spot.description}</p></div>
        <div className="spot-checkout-contact">
          Contact
          {' '}
          <a href={`https://${spot && spot.contact}`} target="_blank" rel="noreferrer" className="spot-checkout-contact-link">{spot && spot.contact}</a>
        </div>
        <Link to="/spots" className="button-move-back-spots" onClick={() => navigate('/spots')}>Move Back</Link>
      </div>
      <div className="spot-page-right">
        <div className="spot-carousel-div">
          <Carousel className="spot-carousel">
            {spot
              ? spot.SpotPhotos.map((spott) => (
                <Carousel.Item key={spott.id}>
                  <Image className="carousel-spot-img" src={spott.photo} alt={spott.name} />
                  <Carousel.Caption>
                    <h3>{spot.name}</h3>
                  </Carousel.Caption>
                </Carousel.Item>
              ))
              : (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              )}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default SpotPage;
