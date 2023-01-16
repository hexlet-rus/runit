import React, { useMemo } from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';
import { SnippetsContext } from '../contexts';
import routes from '../routes';
// const { Buffer } = require('buffer');

function SnippetsProvider({ children }) {
  const encodeId = (id) => {
    const idString = id.toString();
    const encodedId = Buffer.from(idString).toString('base64');
    return encodedId;
  };

  const decodeId = (encodedId) => {
    const decodedId = Buffer.from(encodedId, 'base64').toString('utf-8');
    return decodedId;
  };

  const getSnippetData = async (id) => {
    const response = await axios.get(routes.getSnippetPath(id));
    return response.data;
  };

  const getSnippetDataByViewParams = async ({ login, slug }) => {
    const { data } = await axios.get(routes.userInfoPath(login));
    return data.snippets.find((snippet) => snippet.slug === slug);
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

  const hasSnippetParams = () => {
    const url = new URL(window.location);
    return url.searchParams.has('snippet');
  };

  const hasViewSnippetParams = (urlData) => {
    return urlData.login && urlData.slug;
  };

  const getSnippetIdFromParams = () => {
    const url = new URL(window.location);
    const encodedId = url.searchParams.get('snippet');
    const decodedId = decodeId(encodedId);
    return decodedId;
  };

  const getViewSnippetParams = (loaderData) => {
    return loaderData;
  };

  const genViewSnippetLink = (login, slug) => {
    const url = new URL(`/users/${login}/snippets/${slug}`, window.location);
    return url.toString();
  };

  const genSnippetLink = (encodedId) => {
    const url = new URL(routes.homePagePath(), window.location);
    url.searchParams.set('snippet', encodedId);
    return url.toString();
  };

  const genEmbedSnippetLink = (encodedId) => {
    const url = new URL(routes.embedPagePath(), window.location);
    url.searchParams.set('snippet', encodedId);
    return url.toString();
  };

  const genEmbedFrame = (link) => {
    return `<iframe 
      height="300"
      scrolling="no"
      style="width: 754px"
      src="${link}"
      loading="lazy"
      allowTransparency
      allowFullScreen
    >`;
  };

  const memoizedValue = useMemo(
    () => ({
      encodeId,
      decodeId,
      saveSnippet,
      renameSnippet,
      deleteSnippet,
      genEmbedFrame,
      genSnippetLink,
      genViewSnippetLink,
      getSnippetData,
      getSnippetDataByViewParams,
      hasSnippetParams,
      hasViewSnippetParams,
      genEmbedSnippetLink,
      getSnippetIdFromParams,
      getViewSnippetParams,
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
