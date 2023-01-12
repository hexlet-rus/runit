import React from 'react';
import axios from 'axios';
import { SnippetsContext } from '../contexts';
import routes from '../routes';

const { Buffer } = require('buffer');

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

  const saveSnippet = async (code, name) => {
    const response = await axios.post(routes.createSnippetPath(), {
      name,
      code,
    });
    const id = response.data.id.toString();
    const encodedId = encodeId(id);
    return encodedId;
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

  const getSnippetIdFromParams = () => {
    const url = new URL(window.location);
    const encodedId = url.searchParams.get('snippet');
    const decodedId = decodeId(encodedId);
    return decodedId;
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

  return (
    <SnippetsContext.Provider
      value={{
        encodeId,
        decodeId,
        saveSnippet,
        renameSnippet,
        deleteSnippet,
        genEmbedFrame,
        genSnippetLink,
        getSnippetData,
        hasSnippetParams,
        genEmbedSnippetLink,
        getSnippetIdFromParams,
      }}
    >
      {children}
    </SnippetsContext.Provider>
  );
}

export default SnippetsProvider;
