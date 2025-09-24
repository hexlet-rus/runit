import { useMemo } from 'react';
import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useTRPC } from '../utils/trpc';
import type { Languages } from '../types/slices';
import { SnippetsContext } from '../contexts';
import routes from '../routes';
import { actions as snippetActions} from '../slices/snippetsSlice';

function SnippetsProvider({ children }) {

  const trpc = useTRPC();
  const dispatch = useDispatch();

  const saveSnippetMutation = useMutation(
    trpc.snippets.createSnippet.mutationOptions({
      onSuccess(data) {
        dispatch(snippetActions.addSnippets(data));
        return data.id;
      },
    }),
  );
  const updateSnippetMutation = useMutation(
    trpc.snippets.updateSnippet.mutationOptions({
      onSuccess(updatedSnippet) {
        return updatedSnippet;
      },
    }),
  );

  const { refetch, data, isSuccess, status } = useQuery(trpc.snippets.generateSnippetName.queryOptions());

  const getSnippetData = async (id: number) => {
    const response = trpc.snippets.getSnippetById.queryOptions(id);
    return response;
  };

  const getSnippetDataByViewParams = async ({ username, slug }) => {
    const response = trpc.snippets.getSnippetByUsernameSlug.queryOptions(
      username,
      slug,
    );
    return response;
  };

  const saveSnippet = async (code: string, name: string, language: Languages) => {
    await saveSnippetMutation.mutateAsync({
      name,
      code,
      language,
    });
  };

  const deleteSnippet = async (...decodedId) => {
    const response = await Promise.all(
      decodedId.map((id) => axios.delete(routes.deleteSnippetPath(id))),
    );
    return response;
  };

  const renameSnippet = async (decodedId, snippetData) => {
    const response = await axios.put(
      routes.updateSnippetPath(decodedId),
      snippetData,
    );
    const renamedSnippet = response.data;
    return renamedSnippet;
  };

  const updateSnippet = async (id, snippetData) => {
    const updatedSnippet = await updateSnippetMutation.mutateAsync(
      id,
      snippetData,
    );
    return updatedSnippet;
  };

  const hasViewSnippetParams = (urlData = {}) =>
    urlData.username && urlData.slug;

  const genViewSnippetLink = (username, slug) => {
    const url = new URL(
      routes.snippetPagePath(username, slug),
      window.location.origin,
    );
    return url.toString();
  };

  const genEmbedSnippetLink = (username, slug) => {
    const url = new URL(
      routes.embedSnippetPagePath(username, slug),
      window.location.origin,
    );
    return url.toString();
  };

  const genEmbedFrame = (link) => `<iframe 
  height="300"
  scrolling="no"
  style="width: 754px"
  src="${link}"
  loading="lazy"
  allowTransparency
  allowFullScreen
>`;

  const getDefaultSnippetName = async (): Promise<{ name: string }> => {
    return data;
  };

  const memoizedValue = useMemo(
    () => ({
      saveSnippet,
      renameSnippet,
      updateSnippet,
      deleteSnippet,
      genEmbedFrame,
      genViewSnippetLink,
      getSnippetData,
      getSnippetDataByViewParams,
      hasViewSnippetParams,
      genEmbedSnippetLink,
      getDefaultSnippetName,
    }),
    [],
  );

  return (
    <SnippetsContext.Provider value={memoizedValue}>
      {children}
    </SnippetsContext.Provider>
  );
}

export default SnippetsProvider;
