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
    const { data } = await axios.get(
      routes.getSnippetPathByParams(username, slug),
    );
    return data;
  };

  const saveSnippet = async (code, name) => {
    const { data } = await axios.post(routes.createSnippetPath(), {
      name,
      code,
    });
    return data.id;
  };

  const deleteSnippet = async (decodedId) => {
    const response = await axios.delete(routes.deleteSnippetPath(decodedId));
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
  height="300"
  scrolling="no"
  style="width: 754px"
  src="${link}"
  loading="lazy"
  allowTransparency
  allowFullScreen
>`;

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
