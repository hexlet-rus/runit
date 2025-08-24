import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import { actions } from '../slices/index';
import routes from '../routes';

const { runCode } = actions;

const useRunButton = () => {
  const dispatch = useDispatch();
  const codeExecutionState = useSelector(
    (state) => state.terminal.codeExecutionState,
  );
  const snippet = useSelector((state) => state.editor.snippetData);
  const code = useSelector((state) => state.editor.code);
  const onClick = useCallback(
    () => dispatch(runCode({ ...snippet, code })),
    [dispatch, code, snippet],
  );
  const update = async (id, name) => {
    const response = await axios.put(routes.updateSnippetPath(id), {
      code,
      name,
    });
    dispatch(actions.updateSavedCode(code));
    return response;
  };

  const disabled = codeExecutionState === 'executing';

  return {
    onClick,
    update,
    disabled,
    code,
  };
};

export default useRunButton;
