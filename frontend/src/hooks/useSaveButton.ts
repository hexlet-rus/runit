import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../slices/editorSlice';
import { AppDispatch, RootState } from '../slices/index';
import { UseSaveButtonReturn } from '../types/hooks';

const useSaveButton = (): UseSaveButtonReturn => {
  const currentCode = useSelector((state: RootState) => state.editor.code);
  const dispatch: AppDispatch = useDispatch();
  const saveCode = () => {
    dispatch(actions.setCodeAndSavedCode(currentCode));
  };

  return {
    saveCode,
  };
};

export default useSaveButton;
