// 1. сохранить код
// 2 перенаправить в мои снипеты

import { useSelector, useDispatch } from 'react-redux';
import routes from '../routes.js';

const useSaveButton = () => {
  const { editor, user } = useSelector((state) => state);
  const saveCode = () => {
    if (editor.isAllSaved) {
      console.log(user, 'user');
      routes.profilePagePath(user.userInfo.username);
    }
  };

  return {
    moveTo,
    saveCode,
  };
};

export default useSaveButton;
