/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type {
  CheckedSnippetsType,
  CheckboxesSnippetsStateType,
  FetchedSnippet,
} from '../types/slices';

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
      if (checkedSnippet) checkedSnippet.isChecked = checked;
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
    setUncheck: (state, { payload }) => {
      state.checkedSnippets = payload.snippets.map((snippet: FetchedSnippet) => {
        const container: CheckedSnippetsType = {
          id: snippet.id,
          isChecked: false, // somnitel'no no okay
        };
        return container;
      });
      state.isCheckboxesOpen = false;
    }
  },
});

export const { actions } = checkboxSlice;

export default checkboxSlice.reducer;
