import { combineReducers } from '@reduxjs/toolkit';
import editorReducer, { actions as editorActions } from './editorSlice.js';
import terminalReducer, {
  actions as terminalActions,
  runCode,
} from './terminalSlice.js';
import languagesReducer, {
  actions as languagesActions,
} from './languagesSlice.js';
import modalReducer, { actions as modalActions } from './modalSlice.js';
import snippetsSlice, { actions as snippetsActions } from './snippetsSlice.js';
import userSlice, { actions as userActions } from './userSlice';
import checkboxesSlice, {
  actions as checkboxesActions,
} from './checkboxesSlice.js';

export const rootReducer = combineReducers({
  editor: editorReducer,
  terminal: terminalReducer,
  languages: languagesReducer,
  modal: modalReducer,
  snippets: snippetsSlice,
  user: userSlice,
  checkboxes: checkboxesSlice,
});

// export const setupState = (gon) => (dispatch) => {
// FIXME: гон сейчас пустой, поэтому фолбек на джаваскрипт
//  dispatch(editorActions.changeLanguage(gon.language || 'javascript'));
// };

export const actions = {
  ...editorActions,
  ...terminalActions,
  ...languagesActions,
  ...modalActions,
  ...snippetsActions,
  ...userActions,
  ...checkboxesActions,
  runCode,
};
