/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type {
  LanguagesStateType,
  SupportedLanguagesArr,
} from '../types/slices';

const languages = ['javascript', 'html', 'php', 'python', 'java', 'ruby'];

const initialState: LanguagesStateType = {
  supportedLanguages: languages as SupportedLanguagesArr,
  currentLanguage: 'javascript',
};

const slice = createSlice({
  name: 'languages',
  initialState,
  reducers: {
    changeLanguage(state, { payload }) {
      state.currentLanguage = payload;
    },
  },
});

export const { actions } = slice;

export default slice.reducer;
