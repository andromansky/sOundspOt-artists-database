/* eslint-disable default-param-last */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loadAsyncSpots = createAsyncThunk(
  'spots/loadSpots',
  async () => {
    const response = await fetch('/spots');
    if (response.status >= 400) {
      const { error } = await response.json();
      throw error;
    } else {
      const data = await response.json();
      return data.spotsWithPhoto;
    }
  }
);

export const loadAsyncSpot = createAsyncThunk(
  'spot/loadSpot',
  async (id) => {
    const response = await fetch(`/spots/${id}`);
    if (response.status >= 400) {
      const { error } = await response.json();
      throw error;
    } else {
      const data = await response.json();
      return data.spot;
    }
  }
);

const initialState = {
  spots: [],
  error: null,
  spot: null,
};

const spotsSlice = createSlice({
  name: 'spots',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAsyncSpots.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loadAsyncSpots.fulfilled, (state, action) => {
        state.spots = action.payload;
      })
      .addCase(loadAsyncSpot.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loadAsyncSpot.fulfilled, (state, action) => {
        state.spot = action.payload;
      });
  }
});

export default spotsSlice.reducer;
