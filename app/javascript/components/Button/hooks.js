import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getData } from '../../slices/editorSlice';

import { actions } from '../../slices/index.js';

import routes from '../../routes.js';

const { runCode } = actions;

export const useButton = () => {
  const dispatch = useDispatch();
  const { codeExecutionState, code } = useSelector(({ terminal, editor }) => ({
    codeExecutionState: terminal.codeExecutionState,
    code: editor.code,
  }));
  const onClick = useCallback(
    () => dispatch(runCode(code)),
    [dispatch, runCode, code],
  );
  const update = async (id) => {
    // const data = await getData();
    const response = await axios.put(routes.updateSnippetPath(id), { code });
    return response;
    /*    if (!data) {
      return 'Please signin for save snippets';
    }
    const response = await axios.put(`api/snippets/${data}`, {
      code,
    });
    return response; */
  };
  const disabled = codeExecutionState === 'executing';

  return {
    onClick,
    update,
    disabled,
    code,
  };
};
