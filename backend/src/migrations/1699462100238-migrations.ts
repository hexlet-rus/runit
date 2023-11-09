/* eslint class-methods-use-this: ["error", { "exceptMethods": ["up", "down"] }] */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1699462100238 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "snippets" ADD COLUMN "language" varchar(50) DEFAULT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "snippets" DROP COLUMN language`);
  }
}
