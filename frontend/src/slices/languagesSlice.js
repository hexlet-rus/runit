/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'languages',
  initialState: {
    supportedLanguages: ['javascript', 'html'],
    currentLanguage: 'javascript',
  },
  reducers: {
    changeLanguage(state, { payload }) {
      state.currentLanguage = payload;
    },
  },
});

export const { actions } = slice;

export default slice.reducer;
