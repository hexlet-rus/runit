/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const languages = ['javascript', 'html', 'php', 'python', 'java', 'ruby'];

const slice = createSlice({
  name: 'languages',
  initialState: {
    supportedLanguages: languages,
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
