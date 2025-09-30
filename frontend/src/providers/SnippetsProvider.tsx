import { useMemo, useState } from 'react';
import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { ICreateSnippetsContext } from 'src/types/context';
import { useDispatch } from 'react-redux';
import { useTRPC } from '../utils/trpc';
import type { FetchedSnippet, Languages } from '../types/slices';
import { SnippetsContext } from '../contexts';
import routes from '../routes';
import { actions as snippetActions } from '../slices/snippetsSlice';

function SnippetsProvider({ children }) {
  const trpc = useTRPC();
  const dispatch = useDispatch();
  const [snippetId, setSnippetId] = useState<number | null>(null);
  const [snippetViewParams, setSnippetViewParams] = useState<{
    username: string;
    slug: string;
  } | null>(null);

  const deleteSnippetMutation = useMutation(
    trpc.snippets.deleteSnippet.mutationOptions({
      onSuccess(data) {
        dispatch(snippetActions.deleteSnippet(data.ids));
        return data.success;
      },
      onError(e) {
        console.warn(e.message);
      },
    }),
  );
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
        dispatch(snippetActions.updateSnippet(updatedSnippet));
        return updatedSnippet;
      },
    }),
  );
  const snippetNameQuery = useQuery(
    trpc.snippets.generateSnippetName.queryOptions(),
  );
  const snippetDataQuery = useQuery(
    trpc.snippets.getSnippetById.queryOptions(snippetId, {
      enabled: !!snippetId,
    }),
  );

  const snippetDataByViewParamsQuery = useQuery(
    trpc.snippets.getSnippetByUsernameSlug.queryOptions(snippetViewParams, {
      enabled: !!snippetViewParams,
    }),
  );

  const getSnippetData = async (id: number) => {
    setSnippetId(id);
    return snippetDataQuery;
  };

  const getSnippetDataByViewParams = async (snippetData: {
    username: string;
    slug: string;
  }) => {
    setSnippetViewParams(snippetData);
    return snippetDataByViewParamsQuery;
  };
  const saveSnippet = async (
    code: string,
    name: string,
    language: Languages,
  ) => {
    const { id } = await saveSnippetMutation.mutateAsync({
      name,
      code,
      language,
    });
    return id;
  };

  const deleteSnippet = async (decodedId) => {
    const response = await deleteSnippetMutation.mutateAsync(decodedId);
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

  const hasViewSnippetParams = (urlData) =>
    !!urlData.username && !!urlData.slug;

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

  const genEmbedFrame = (link: string) => `<iframe
  src="${link}"
  title="RunIT Snippet"
  loading="lazy"
  style="width: 100%; height: 300px; border: 0;"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
  referrerpolicy="no-referrer-when-downgrade"
  ></iframe>`

  const getDefaultSnippetName = async () => {
    if (snippetNameQuery.status === 'success') {
      return snippetNameQuery.data.name;
    }
    const snippName = await snippetNameQuery.refetch();
    return snippName.data.name;
  };

  const memoizedValue = useMemo<ICreateSnippetsContext>(
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
