/* eslint-disable no-restricted-globals */
/* eslint-disable default-param-last */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loadAsyncBands = createAsyncThunk(
  'bands/loadBands',
  async () => {
    const response = await fetch('/bands');
    if (response.status >= 400) {
      const { error } = await response.json();
      throw error;
    } else {
      const data = await response.json();
      return data;
    }
  }
);

export const updateAsyncBandsList = createAsyncThunk(
  'bands/searchBands',
  async ({ filtersGenre, orderByName, inputText }) => {
    const response = await fetch('/bands/search', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ filtersGenre, orderByName, inputText })
    });
    if (response.status >= 400) {
      const { error } = await response.json();
      throw error;
    } else {
      const data = await response.json();
      return data.bandsWithExtraStuff;
    }
  }
);

export const loadAsyncBand = createAsyncThunk(
  'band/loadBand',
  async (id) => {
    const response = await fetch(`/bands/${id}`);
    if (response.status >= 400) {
      const { error } = await response.json();
      throw error;
    } else {
      const data = await response.json();
      return data.band;
    }
  }
);

const initialState = {
  bands: [],
  genres: [],
  error: null,
  band: null,
};

const bandsSlice = createSlice({
  name: 'bands',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAsyncBands.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loadAsyncBands.fulfilled, (state, action) => {
        state.bands = action.payload.bandsWithExtraStuff;
        state.genres = action.payload.genres;
      })
      .addCase(loadAsyncBand.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loadAsyncBand.fulfilled, (state, action) => {
        state.band = action.payload;
      })
      .addCase(updateAsyncBandsList.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateAsyncBandsList.fulfilled, (state, action) => {
        state.bands = action.payload;
      });
  }
});

export default bandsSlice.reducer;
