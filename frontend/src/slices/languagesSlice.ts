/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type {
  LanguagesStateType,
  SupportedLanguagesArr,
} from 'src/types/slices';

const languages: SupportedLanguagesArr = [
  'javascript',
  'html',
  'php',
  'python',
  'java',
  'ruby',
];

const initialState: LanguagesStateType = {
  supportedLanguages: languages,
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
