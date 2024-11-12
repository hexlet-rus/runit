/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { fetchUserSnippets } from './snippetsSlice.js';

const initialState = {
  checkedSnippets: [],
  isCheckboxesOpen: false,
};

const checkboxSlice = createSlice({
  name: 'snippets',
  initialState,
  reducers: {
    updateCheckedSnippet: (state, { payload: { id, checked } }) => {
      const checkedSnippet = state.checkedSnippets.find(
        (snippet) => snippet.id === id,
      );
      checkedSnippet.isChecked = checked;
    },
    OpenCheckboxes: (state) => {
      state.isCheckboxesOpen = true;
      state.checkedSnippets.forEach((snippet) => {
        snippet.isChecked = false;
      });
    },
    CloseCheckboxes: (state) => {
      state.isCheckboxesOpen = false;
      state.checkedSnippets.forEach((snippet) => {
        snippet.isChecked = false;
      });
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUserSnippets.fulfilled, (state, { payload }) => {
      state.checkedSnippets = payload.snippets.map((snippet) => {
        const container = {};
        container.id = snippet.id;
        return container;
      });
      state.isCheckboxesOpen = false;
    });
  },
});

export const { actions } = checkboxSlice;

export default checkboxSlice.reducer;
