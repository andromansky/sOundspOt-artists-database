import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../Layout';
import MainPage from '../MainPage/MainPage';
import { loadAsyncUsers } from '../../storeAndSlices/Slices/usersReducer';
import { loadAsyncBands } from '../../storeAndSlices/Slices/bandsReducer';
import { loadAsyncSpots } from '../../storeAndSlices/Slices/spotsReducer';
import RootPage from '../RootPage/RootPage';
import UserPage from '../UserPage/UserPage';
import Registration from '../Registration/Registration';
import Authorization from '../Authorization/Authorization';
import ArtistPageSearch from '../ArtistPageSearch/ArtistPageSearch';
import BandPageSearch from '../BandPageSearch/BandPageSearch';
import { loadSessionUser } from '../../storeAndSlices/Slices/authReducer';
import SpotsSearchPage from '../SpotsSearchPage/SpotsSearchPage';
import BandPage from '../BandPage/BandPage';
import Demos from '../Demos/Demos';
import Profile from '../Profile/Profile';
import ProfileSettings from '../ProfileSettings/ProfileSettings';
import Music from '../Music/Music';
import SpotPage from '../SpotPage/SpotPage';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

function App() {
  const dispatch = useDispatch();
  const { hasUser } = useSelector((state) => state.authState);

  useEffect(() => {
    dispatch(loadSessionUser());
    dispatch(loadAsyncUsers());
    dispatch(loadAsyncBands());
    dispatch(loadAsyncSpots());
  }, []);

  return (
    <div className="App">
      {hasUser ? (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<RootPage><Registration /></RootPage>} />
            <Route path="/signup" element={<RootPage><Registration /></RootPage>} />
            <Route path="/signin" element={<RootPage><Authorization /></RootPage>} />
            <Route path="/home" element={<MainPage />} />
            <Route path="/spots" element={<SpotsSearchPage />} />
            <Route path="/artists" element={<ArtistPageSearch />} />
            <Route path="/bands" element={<BandPageSearch />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profilesettings" element={<ProfileSettings />} />
            <Route path="/bands/:id/" element={<BandPage />} />
            <Route path="/artists/:id/" element={<UserPage />} />
            <Route path="/artists/:id/music" element={<Demos />} />
            <Route path="/bands/:id/music" element={<Demos />} />
            <Route path="/music" element={<Music />} />
            <Route path="/spots/:id/" element={<SpotPage />} />
            <Route path="*" element={<LoadingSpinner />} />
          </Route>
        </Routes>

      ) : (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<RootPage><Registration /></RootPage>} />
            <Route path="/signup" element={<RootPage><Registration /></RootPage>} />
            <Route path="/signin" element={<RootPage><Authorization /></RootPage>} />
            <Route path="/home" element={<MainPage />} />
            <Route path="/spots" element={<SpotsSearchPage />} />
            <Route path="/artists" element={<ArtistPageSearch />} />
            <Route path="/bands" element={<BandPageSearch />} />
            <Route path="*" element={<LoadingSpinner />} />
          </Route>
        </Routes>

      )}
    </div>
  );
}

export default App;
