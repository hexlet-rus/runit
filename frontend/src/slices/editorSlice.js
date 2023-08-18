/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const DEFAULT_CODE = '// Write your code in JS\n';

const initialState = {
  snippetData: {
    id: null,
    name: null,
    ownerUsername: null,
    slug: null,
  },
  error: false,
  isReady: false,
  hasSnippetData: false,
  code: DEFAULT_CODE,
  savedCode: DEFAULT_CODE,
  isAllSaved: true,
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setActiveSnippetData(state, { payload }) {
      state.snippetData = payload;
      state.hasSnippetData = true;
      state.isReady = true;
    },
    updateActiveSnippetName: (state, { payload }) => {
      state.snippetData.name = payload;
    },
    setCodeAndSavedCode(state, { payload }) {
      state.code = payload;
      state.savedCode = payload;
      state.isAllSaved = true;
    },
    updateCode(state, { payload }) {
      state.code = payload;
      state.isAllSaved = state.code === state.savedCode;
    },
    updateSavedCode(state, { payload }) {
      state.savedCode = payload;
      state.isAllSaved = state.code === state.savedCode;
    },
    resetEditor(_state, { payload }) {
      const code = payload ?? DEFAULT_CODE;
      return { ...initialState, code };
    },
  },
});

export const { actions } = editorSlice;

export default editorSlice.reducer;
