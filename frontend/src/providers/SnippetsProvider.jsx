import { useMemo } from 'react';
import axios from 'axios';
import { SnippetsContext } from '../contexts';
import routes from '../routes';

function SnippetsProvider({ children }) {
  const getSnippetData = async (id) => {
    const response = await axios.get(routes.getSnippetPath(id));
    return response.data;
  };

  const getSnippetDataByViewParams = async ({ username, slug }) => {
    const response = await axios.get(
      routes.getSnippetPathByParams(username, slug),
    );
    // #TODO: ответ должен содержать данные о языке сниппета (response.data.language)
    return response.data;
  };

  const saveSnippet = async (code, name, language) => {
    const { data } = await axios.post(routes.createSnippetPath(), {
      name,
      code,
      language,
    });
    return data.id;
  };

  const deleteSnippet = async (...decodedId) => {
    const response = await Promise.all(
      decodedId.map((id) => axios.delete(routes.deleteSnippetPath(id))),
    );
    return response;
  };

  const renameSnippet = async (decodedId, data) => {
    const response = await axios.put(routes.updateSnippetPath(decodedId), data);
    const renamedSnippet = response.data;
    return renamedSnippet;
  };

  const updateSnippet = async (id, data) => {
    const response = await axios.put(routes.updateSnippetPath(id), data);
    const updatedSnippet = response.data;
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
  src="${link}"
  title="RunIT Snippet"
  loading="lazy"
  style="width: 100%; height: 300px; border: 0;"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
  referrerpolicy="no-referrer-when-downgrade"
></iframe>`;

  const getDefaultSnippetName = async () => {
    const response = await axios.get(routes.getDefaultSnippetName());
    return response.data;
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
