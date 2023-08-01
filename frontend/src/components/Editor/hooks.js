// import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { actions } from '../../slices';

export const useEditor = () => {
  const dispatch = useDispatch();

  const { code, language } = useSelector((state) => ({
    code: state.editor.code,
    language: state.languages.currentLanguage,
    hasSnippetData: state.editor.hasSnippetData,
    snippetData: state.editor.snippetData,
    isAllSaved: state.editor.hasSnippetData,
  }));

  const onChange = (newCode) => {
    dispatch(actions.updateCode(newCode));
  };

  const onMount = (editor, monaco) => {
    window.addEventListener('resize', () => {
      if (editor) {
        editor.layout();
      }
    });
    editor.focus();
    // eslint-disable-next-line no-bitwise
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      const currentCode = editor.getValue();
      dispatch(actions.runCode(currentCode));
    });
  };

  return {
    code,
    language,
    onChange,
    editorDidMount: onMount,
  };
};
