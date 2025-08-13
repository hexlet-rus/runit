/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type {
  FetchedTerminalDataType,
  IOutput,
  TerminalStateType,
} from '../types/slices';
import routes from '../routes';
import { actions as editorActions } from './editorSlice';

export const runCode = createAsyncThunk(
  'terminal/runCode',
  async (snippet: FetchedTerminalDataType) => {
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
      } = getState() as {
        terminal: { codeExecutionState: 'idle' | 'executing' };
      };
      return codeExecutionState !== 'executing';
    },
  },
);

const initialState: TerminalStateType = {
  codeExecutionState: 'idle',
  output: { terminal: [], alertLogs: [] },
};

const slice = createSlice({
  name: 'terminal',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(runCode.pending, (state) => {
        state.codeExecutionState = 'executing';
      })
      .addCase(runCode.fulfilled, (state, { payload }) => {
        state.codeExecutionState = 'idle';
        state.output = payload;
      })
      .addCase(runCode.rejected, (state, { payload }) => {
        state.output = payload as IOutput;
        state.codeExecutionState = 'idle';
      })
      .addCase(editorActions.resetEditor, (state) => {
        state.output = { terminal: [], alertLogs: [] };
        state.codeExecutionState = 'idle';
      });
  },
});

export const { actions } = slice;

export default slice.reducer;
