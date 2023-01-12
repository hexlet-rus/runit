/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  snippets: [],
};

const snippetSlice = createSlice({
  name: 'snippets',
  initialState,
  reducers: {
    addSnippets: (state, { payload }) => {
      state.snippets = [...state.snippets, ...payload];
    },
    deleteSnippet: (state, { payload }) => {
      state.snippets = state.snippets.filter(
        (snippet) => snippet.id !== payload,
      );
    },
    updateSnippet: (state, { payload: { id, name } }) => {
      const renamedSnippet = state.snippets.find(
        (snippet) => snippet.id === id,
      );
      renamedSnippet.name = name;
    },
  },
});

export const { actions } = snippetSlice;

export default snippetSlice.reducer;
