/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import type { ResponseUserSnippets, SnippetsStateType } from '../types/slices';

import routes from '../routes';

export const fetchUserSnippets = createAsyncThunk(
  'user/fetchUserSnippets',
  async () => {
    const response: AxiosResponse<ResponseUserSnippets> = await axios.get(
      routes.userProfilePath(),
    );
    console.log(response.data);
    // #TODO: ответ должен содержать данные о языке сниппета (response.data.snippets[snippet].language)
    return response.data;
  },
);

const initialState: SnippetsStateType = {
  status: 'empty',
  snippets: [],
};

const snippetSlice = createSlice({
  name: 'snippets',
  initialState,
  reducers: {
    changeStatus: (state, { payload }) => {
      state.status = payload;
    },
    addSnippets: (state, { payload }) => {
      state.snippets = [...state.snippets, payload];
      state.status = 'empty';
    },
    deleteSnippet: (state, { payload }) => {
      const snippetId = !Array.isArray(payload) ? [payload] : payload;
      state.snippets = state.snippets.filter(
        (snippet) => !snippetId.includes(snippet.id),
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
