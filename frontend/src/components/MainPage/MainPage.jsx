import React from 'react';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import Spinner from 'react-bootstrap/Spinner';
import Image from 'react-bootstrap/Image';
import './MainPage.css';

function MainPage() {
  const { users } = useSelector((store) => store.usersState);
  const { hasUser } = useSelector((state) => state.authState);
  const { bands } = useSelector((store) => store.bandsState);
  const { spots } = useSelector((store) => store.spotsState);

  return (
    <div className="mainPageContainer soundSpot__mainpage_container">
      <div className="soundSpot__mainpage_subheader-text">
        <p>
          These
          {' '}
          <span>ARTISTS</span>
          ,
          {' '}
          <span>BANDS</span>
          {' '}
          and
          {' '}
          <span>SPOTS</span>
          {' '}
          are on SoundSpot right now.
        </p>
        {hasUser ? (
          <p>Check them out and explore</p>
        ) : (
          <p>Register or login in to check them out and explore</p>
        )}
        <p>more!</p>
      </div>
      <div className="carouselContainer">
        <Carousel>
          {users
            ? users.map((user) => (
              <Carousel.Item key={user.id}>
                <Image className="d-block w-100" src={user.photo} alt={user.email} />
                <Carousel.Caption>
                  <h3>{user.login}</h3>
                </Carousel.Caption>
              </Carousel.Item>
            ))
            : (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
        </Carousel>
        <Carousel>
          {bands
            ? bands.map((band) => (
              <Carousel.Item key={`B${band.id}`}>
                <Image className="d-block w-100" src={band.photo} alt={band.name} width={350} height={400} />
                <Carousel.Caption>
                  <h3>{band.name}</h3>
                </Carousel.Caption>
              </Carousel.Item>
            ))
            : (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
        </Carousel>
        <Carousel>
          {spots
            ? spots.map((spot) => (
              <Carousel.Item key={spot.dataValues.id}>
                <Image className="d-block w-100" src={spot.photo} alt={spot.name} width={350} height={400} />
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
  );
}

export default MainPage;
