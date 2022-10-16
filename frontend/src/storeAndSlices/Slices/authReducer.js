import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  data: {
    id: null,
    email: null,
    login: null,
    about: null,
    latitude: null,
    longitude: null,
    contact: null,
    photo: null,
  },
  hasUser: false,
  helpMessage: null,
  error: null,
};

const loadSessionUser = createAsyncThunk(
  'auth/loadSessionUser',
  () => fetch('/auth')
    .then((response) => response.json())
    .then((body) => {
      if (body.error) {
        throw new Error(body.error);
      }
      return body.user;
    }),
);

const loginUser = createAsyncThunk(
  'auth/loginUser',
  (data) => fetch('/auth/login', {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((body) => {
      if (body.error) {
        throw new Error(body.error);
      }
      return body.user;
    }),
);

const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  () => fetch('/auth/signout', {
    method: 'delete',
  })
    .then((response) => response.json())
    .then((body) => {
      if (body.error) {
        throw new Error(body.error);
      }
      return body.error;
    }),
);

const regUser = createAsyncThunk(
  'auth/regUser',
  (data) => fetch('/auth/reg', {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((body) => {
      if (body.error) {
        throw new Error(body.error);
      }
      return body.user;
    }),
);

const changeProfile = createAsyncThunk(
  'user/changeProfile',
  (data) => fetch(`/user/${data.id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((body) => {
      if (body.error) {
        throw new Error(body.error);
      }
      return body;
    }),
);

const changeUserCoord = createAsyncThunk(
  'user/changeLocation',
  (data) => fetch(`/user/${data.id}/changeLocation`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((body) => {
      if (body.error) {
        throw new Error(body.error);
      }
      return body;
    }),
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    disableHelpMessage: (state) => {
      state.helpMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSessionUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.hasUser = false;
      })
      .addCase(loadSessionUser.fulfilled, (state, action) => {
        state.hasUser = true;
        state.data = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.helpMessage = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.hasUser = true;
        state.data = action.payload;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.hasUser = false;
        state.data = {
          id: null,
          email: null,
          login: null,
          about: null,
          latitude: null,
          longitude: null,
          contact: null,
          photo: null,
        };
      })
      .addCase(regUser.rejected, (state, action) => {
        state.helpMessage = action.error.message;
      })
      .addCase(regUser.fulfilled, (state, action) => {
        state.hasUser = true;
        state.data = action.payload;
      })
      .addCase(changeProfile.rejected, (state, action) => {
        state.helpMessage = action.error.message;
      })
      .addCase(changeProfile.fulfilled, (state, action) => {
        state.data = action.payload;
        state.helpMessage = null;
      })
      .addCase(changeUserCoord.rejected, (state, action) => {
        state.helpMessage = action.error.message;
      })
      .addCase(changeUserCoord.fulfilled, (state, action) => {
        state.data = action.payload;
        state.helpMessage = null;
      });
  },
});

// Экспорт reducer-функции
export default authSlice.reducer;

// Экспорт action creator-функций
export const { disableHelpMessage } = authSlice.actions;

// Экспорт action creator-функций (thunk)
export {
  loadSessionUser, loginUser, logoutUser, regUser, changeProfile, changeUserCoord,
};
