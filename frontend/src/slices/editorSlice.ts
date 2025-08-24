/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type {
  DirectionType,
  EditorSnippetData,
  EditorStateType,
  IActionIsNotMobile,
  IActionResetEditor,
  IActionSetActiveSnippetData,
  IActionUpdateActiveSnippetName,
  IActionUpdateCode,
  IActionUpdateDirection,
} from '../types/slices';
// TODO: добавить изменение надписи в завимимости от языка сниппета
export const DEFAULT_CODE = '// Write your code in JS\n';

const initialState: EditorStateType = {
  snippetData: {
    id: null,
    name: null,
    ownerUsername: null,
    slug: null,
    language: null,
  },
  error: false,
  isReady: false,
  hasSnippetData: false,
  code: DEFAULT_CODE,
  savedCode: DEFAULT_CODE,
  isAllSaved: true,
  direction: 'horizontal',
  isNotMobile: false,
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setActiveSnippetData(state, { payload }: IActionSetActiveSnippetData) {
      state.snippetData = payload;
      state.hasSnippetData = true;
      state.isReady = true;
    },
    updateActiveSnippetName: (
      state,
      { payload }: IActionUpdateActiveSnippetName,
    ) => {
      state.snippetData.name = payload;
    },
    setCodeAndSavedCode(state, { payload }: IActionUpdateCode) {
      state.code = payload;
      state.savedCode = payload;
      state.isAllSaved = true;
    },
    updateCode(state, { payload }: IActionUpdateCode) {
      state.code = payload;
      state.isAllSaved = state.code === state.savedCode;
    },
    updateSavedCode(state, { payload }: IActionUpdateCode) {
      state.savedCode = payload;
      state.isAllSaved = state.code === state.savedCode;
    },
    resetEditor(_state, { payload }: IActionResetEditor) {
      const code = payload ?? DEFAULT_CODE;
      return { ...initialState, code };
    },
    updateDirection(state, { payload }: IActionUpdateDirection) {
      const direction = payload;
      switch (direction) {
        case 'vertical':
          state.direction = 'vertical';
          break;
        case 'horizontal':
          state.direction = 'horizontal';
          break;
        default:
          state.direction = 'horizontal';
      }
    },
    updateIsNotMobile(state, { payload }: IActionIsNotMobile) {
      state.isNotMobile = payload;
    },
  },
});

export const { actions } = editorSlice;

export default editorSlice.reducer;
