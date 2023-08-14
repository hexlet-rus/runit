/* eslint class-methods-use-this: ["error", { "exceptMethods": ["up", "down"] }] */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameLoginToUsername1691073864288 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "login" TO "username"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "username" TO "login"`,
    );
  }
}
