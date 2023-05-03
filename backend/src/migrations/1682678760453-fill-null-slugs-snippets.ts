/* eslint-disable no-console */
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["up", "down"] }] */
import { MigrationInterface, QueryRunner } from 'typeorm';
import { generateUniqSlug } from '../snippets/utils/generate-uniq-slug';
import { Snippets } from '../entities/snippet.entity';

export class FillNullSlugsSnippets1682678760453 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const snippets: Snippets[] = await queryRunner.query(
      `SELECT id, slug FROM snippets;`,
    );
    const nullSnippets = snippets.filter((snippet) => !snippet.slug);

    nullSnippets.forEach(async (nullSnippet) => {
      const slug = generateUniqSlug(snippets);

      await queryRunner.query(
        `UPDATE snippets SET slug='${slug}' WHERE id=${nullSnippet.id};`,
      );
    });
  }

  public async down(): Promise<void> {
    console.log(
      `Revert migrations for filling null slugs in snippets is not specified!`,
    );
  }
}
