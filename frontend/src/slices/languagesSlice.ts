/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Languages, LanguagesStateType } from '../types/slices';

const languages: Languages[] = [
  Languages.javascript,
  Languages.html,
  Languages.php,
  Languages.python,
  Languages.java,
  Languages.ruby,
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
