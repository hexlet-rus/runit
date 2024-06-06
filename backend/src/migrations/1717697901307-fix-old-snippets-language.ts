import { MigrationInterface, QueryRunner } from 'typeorm';
import { Snippet } from '../entities/snippet.entity';

export class FixOldSnippetsLanguage1717697901307 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .getRepository(Snippet)
      .createQueryBuilder()
      .update()
      .set({ language: 'javascript' })
      .where('language IS NULL')
      .execute();
  }

  public async down(): Promise<void> {
    // nothing
  }
}
