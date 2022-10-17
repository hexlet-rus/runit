import { combineReducers } from '@reduxjs/toolkit';
import editorReducer, { actions as editorActions } from './editorSlice.js';
import terminalReducer, {
  actions as terminalActions,
  runCode,
} from './terminalSlice.js';
import languagesReducer, {
  actions as languagesActions,
} from './languagesSlice.js';

export const rootReducer = combineReducers({
  editor: editorReducer,
  terminal: terminalReducer,
  languages: languagesReducer,
});

// export const setupState = (gon) => (dispatch) => {
// FIXME: гон сейчас пустой, поэтому фолбек на джаваскрипт
//  dispatch(editorActions.changeLanguage(gon.language || 'javascript'));
// };

export const actions = {
  ...editorActions,
  ...terminalActions,
  ...languagesActions,
  runCode,
};
