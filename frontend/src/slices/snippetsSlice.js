/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import routes from '../routes';

export const fetchUserSnippets = createAsyncThunk(
  'user/fetchUserSnippets',
  async () => {
    const response = await axios.get(routes.userProfilePath());
    // #FIXME: тестовый вариант; удалить, когда с сервера будет приходить язык сниппета
    response.data.snippets.forEach((snippet) => {
      snippet.language = 'html';
    });
    return response.data;
  },
);

const initialState = {
  status: 'empty',
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserSnippets.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchUserSnippets.fulfilled, (state, { payload }) => {
        state.snippets = payload.snippets;
        state.status = 'fullfilled';
      });
  },
});

export const { actions } = snippetSlice;

export default snippetSlice.reducer;
