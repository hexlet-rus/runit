/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { CheckedSnippetsType } from 'src/types/state';
import type { CheckboxesSnippetsStateType } from 'src/types/state';
import { fetchUserSnippets } from './snippetsSlice.js';

const initialState: CheckboxesSnippetsStateType = {
  checkedSnippets: [],
  isCheckboxesOpen: false,
};

const checkboxSlice = createSlice({
  name: 'snippets',
  initialState,
  reducers: {
    updateCheckedSnippet: (state, { payload: { id, checked } }) => {
      const checkedSnippet = state.checkedSnippets.find(
        (snippet: CheckedSnippetsType) => snippet.id === id,
      );
      checkedSnippet.isChecked = checked;
    },
    OpenCheckboxes: (state) => {
      state.isCheckboxesOpen = true;
      state.checkedSnippets.forEach((snippet: CheckedSnippetsType) => {
        snippet.isChecked = false;
      });
    },
    CloseCheckboxes: (state) => {
      state.isCheckboxesOpen = false;
      state.checkedSnippets.forEach((snippet: CheckedSnippetsType) => {
        snippet.isChecked = false;
      });
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUserSnippets.fulfilled, (state, { payload }) => {
      state.checkedSnippets = payload.snippets.map(
        (snippet) => {
          const container: CheckedSnippetsType = {
            id: snippet.id,
            isChecked: false, // somnitel'no no okay
          };
          return container;
        },
      );
      state.isCheckboxesOpen = false;
    });
  },
});

export const { actions } = checkboxSlice;

export default checkboxSlice.reducer;
