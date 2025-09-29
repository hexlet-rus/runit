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
      if (checkedSnippet === undefined) {
        state.checkedSnippets.push({ id, isChecked: checked });
      }
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
    setUncheck: (state, { payload }) => {
      if (payload.snippets !== undefined) {
        state.checkedSnippets = payload.snippets.map(
          (snippet: FetchedSnippet) => {
            const container: CheckedSnippetsType = {};
            container.id = snippet.id
            return container;
          },
        );
        state.isCheckboxesOpen = false;
      }
    },
  },
});

export const { actions } = checkboxSlice;

export default checkboxSlice.reducer;
