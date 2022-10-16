import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './Slices/usersReducer';
import bandsReducer from './Slices/bandsReducer';
import spotsReducer from './Slices/spotsReducer';
import authReducer from './Slices/authReducer';
import userReducer from './Slices/userReducer';

// формирование контейнера состояний (store)
export default configureStore({
  reducer: {
    usersState: usersReducer,
    bandsState: bandsReducer,
    spotsState: spotsReducer,
    authState: authReducer,
    userState: userReducer,
  }
});
