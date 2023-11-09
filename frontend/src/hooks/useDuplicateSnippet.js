import { useCallback } from 'react';
import { useSnippets } from '.';

const useDuplicateSnippet = () => {
  const { saveSnippet, getSnippetData } = useSnippets();

  const duplicateSnippet = useCallback(
    async ({ code, snippetName, language }) => {
      // TODO: дублирование и создание нового снипета - это разные операции. Нужно заменить функцию saveSnippet
      const newId = await saveSnippet(code, snippetName, language);
      const { slug } = await getSnippetData(newId);
      return { slug };
    },
    [getSnippetData, saveSnippet],
  );

  return duplicateSnippet;
};

export default useDuplicateSnippet;
