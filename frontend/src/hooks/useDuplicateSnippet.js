import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth, useSnippets } from './index';
import { actions } from '../slices';
import { fetchUserSnippets } from '../slices/snippetsSlice';
import genDuplicateSnippetName from '../utils/gen-duplicate-snippet-name';

const useDuplicateSnippet = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useAuth();
  const { saveSnippet, getSnippetData, genViewSnippetLink } = useSnippets();
  const username = useSelector((state) => state.user.userInfo.username);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const duplicate = useCallback(
    async ({ code, name, ownerUsername }, shouldOpen = false) => {
      if (!isLoggedIn) {
        dispatch(
          actions.openModal({
            type: 'signingIn',
          }),
        );
      }

      if (isLoggedIn) {
        const newName =
          ownerUsername === username ? genDuplicateSnippetName(name) : name;
        try {
          const newID = await saveSnippet(code, newName);
          const { slug } = await getSnippetData(newID);
          const url = new URL(genViewSnippetLink(username, slug));
          if (shouldOpen) {
            navigate(url.pathname);
          } else {
            dispatch(fetchUserSnippets());
          }
        } catch (error) {
          if (!error.isAxiosError) {
            console.log(t('errors.unknown'));
            throw error;
          } else {
            console.log(t('errors.network'));
            throw error;
          }
        }
      }
    },
    [
      dispatch,
      isLoggedIn,
      getSnippetData,
      saveSnippet,
      genViewSnippetLink,
      t,
      navigate,
      username,
    ],
  );

  return { duplicate };
};

export default useDuplicateSnippet;
