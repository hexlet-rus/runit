/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1670352324202 implements MigrationInterface {
  name = 'migration1670352324202';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "snippets" ADD COLUMN "slug" varchar(30)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "snippets" DELETE COLUMN "slug"`);
  }
}
