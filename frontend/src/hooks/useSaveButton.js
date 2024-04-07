// 1. сохранить код
// 2 перенаправить в мои снипеты

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import routes from '../routes.js';
import { actions } from '../slices/editorSlice.js';

const useSaveButton = () => {
  const currentCode = useSelector((state) => state.editor.code);
  const username = useSelector((state) => state.user.userInfo.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const saveCode = () => {
    dispatch(actions.setCodeAndSavedCode(currentCode));
    navigate(routes.profilePagePath(username));
  };

  return {
    saveCode,
  };
};

export default useSaveButton;
