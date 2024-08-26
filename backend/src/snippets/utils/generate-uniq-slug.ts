import { faker } from '@faker-js/faker';
import { Snippet } from '../../entities/snippet.entity';

export const generateUniqSlug = (snippets: Snippet[]): string => {
  const slug = faker.random.alpha({ count: 7, casing: 'mixed' });
  return !snippets.find((snippet) => snippet.slug === slug)
    ? slug
    : generateUniqSlug(snippets);
};
