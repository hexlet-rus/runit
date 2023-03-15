import { useRef, useEffect, useMemo } from 'react';
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

const debounce = (func, wait = 1000) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
};

export const useDebounce = (callback) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = () => {
      ref.current?.();
    };

    return debounce(func);
  }, []);

  return debouncedCallback;
};
