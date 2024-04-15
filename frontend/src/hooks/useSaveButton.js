import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../slices/editorSlice.js';

const useSaveButton = () => {
  const currentCode = useSelector((state) => state.editor.code);
  const dispatch = useDispatch();
  const saveCode = () => {
    dispatch(actions.setCodeAndSavedCode(currentCode));
  };

  return {
    saveCode,
  };
};

export default useSaveButton;
