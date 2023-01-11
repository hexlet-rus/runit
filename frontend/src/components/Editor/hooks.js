import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../slices';

export const useEditor = () => {
  const dispatch = useDispatch();

  const onChange = (code) => {
    dispatch(actions.updateCode(code));
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
      const code = editor.getValue();
      dispatch(actions.runCode(code));
    });
  };
  const { code, language } = useSelector((state) => ({
    code: state.editor.code,
    language: state.languages.currentLanguage,
  }));

  return {
    code,
    language,
    onChange,
    editorDidMount: onMount,
  };
};
