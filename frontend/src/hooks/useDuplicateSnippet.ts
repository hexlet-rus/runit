import { useCallback } from 'react';
import { useSnippets } from '.';
import { DuplicateSnippetFunction, DuplicateSnippetParams,DuplicateSnippetResult } from '../types/hooks';

const useDuplicateSnippet = (): DuplicateSnippetFunction => {
  const { saveSnippet, getSnippetData } = useSnippets();
 
  const duplicateSnippet = useCallback(
    async ({ code, snippetName, language }: DuplicateSnippetParams): Promise<DuplicateSnippetResult> => {
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
