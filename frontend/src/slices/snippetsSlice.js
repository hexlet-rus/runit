/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import routes from '../routes';

export const fetchUserSnippets = createAsyncThunk(
  'user/fetchUserSnippets',
  async () => {
    const response = await axios.get(routes.userProfilePath());
    // #TODO: ответ должен содержать данные о языке сниппета (response.data.snippets[snippet].language)
    return response.data;
  },
);

const initialState = {
  status: 'empty',
  snippets: [],
  isCheckboxesOpen: false,
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
    updateCheckedSnippet: (state, { payload: { id, checked } }) => {
      const checkedSnippet = state.snippets.find(
        (snippet) => snippet.id === id,
      );
      checkedSnippet.checkbox = checked;
    },
    OpenCheckboxes: (state) => {
      state.isCheckboxesOpen = true;
      state.snippets.forEach((snippet) => {
        snippet.checkbox = false;
      });
    },
    CloseCheckboxes: (state) => {
      state.isCheckboxesOpen = false;
      state.snippets.forEach((snippet) => {
        snippet.checkbox = false;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserSnippets.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchUserSnippets.fulfilled, (state, { payload }) => {
        state.snippets = payload.snippets;
        state.status = 'fullfilled';
        state.isCheckboxesOpen = false;
      });
  },
});

export const { actions } = snippetSlice;

export default snippetSlice.reducer;
