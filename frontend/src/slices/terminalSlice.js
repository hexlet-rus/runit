/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';
import { actions as editorActions } from './editorSlice';

export const runCode = createAsyncThunk(
  'terminal/runCode',
  async (snippet) => {
    // TODO: захардкоден урл, плюс тут явно не нужен createAsyncThunk. (Урл исправлен)
    const { data, status } = await axios.get(routes.runCode(), {
      params: {
        snippet: {
          code: snippet.code,
          language: snippet.language,
        },
      },
    });

    if (status === 200) return data;
    return 'Connection issues';
  },
  {
    condition: (code, { getState }) => {
      const {
        terminal: { codeExecutionState },
      } = getState();
      return codeExecutionState !== 'executing';
    },
  },
);

const slice = createSlice({
  name: 'terminal',
  initialState: {
    codeExecutionState: 'idle',
    output: { terminal: [], alertLogs: [] },
  },
  reducers: {},
  extraReducers: {
    [runCode.pending]: (state) => {
      state.codeExecutionState = 'executing';
    },
    [runCode.fulfilled]: (state, { payload }) => {
      state.codeExecutionState = 'idle';
      state.output = payload;
    },
    [runCode.rejected]: (state, { payload }) => {
      state.output = payload;
      state.codeExecutionState = 'idle';
    },
    [editorActions.resetEditor]: (state) => {
      state.output = { terminal: [], alertLogs: [] };
      state.codeExecutionState = 'idle';
    },
  },
});

export const { actions } = slice;

export default slice.reducer;
