import { useCallback } from 'react';
import { useSnippets } from '.';

const useDuplicateSnippet = () => {
  const { saveSnippet, getSnippetData } = useSnippets();

  const duplicateSnippet = useCallback(
    async ({ code, snippetName }) => {
      const newId = await saveSnippet(code, snippetName);
      const { slug } = await getSnippetData(newId);
      return { slug };
    },
    [getSnippetData, saveSnippet],
  );

  return duplicateSnippet;
};

export default useDuplicateSnippet;
