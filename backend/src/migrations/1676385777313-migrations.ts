import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1676385777313 implements MigrationInterface {
    name = 'migrations1676385777313'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "login" text NOT NULL, "email" varchar NOT NULL, "password" text NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_2d443082eccd5198f95f2a36e2c" UNIQUE ("login"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "text" ON "users" ("email") `);
        await queryRunner.query(`CREATE TABLE "snippets" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "slug" text NOT NULL, "name" text NOT NULL DEFAULT ('Untitled'), "code" text NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_snippets" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "slug" text NOT NULL, "name" text NOT NULL DEFAULT ('Untitled'), "code" text NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, CONSTRAINT "FK_8fdfc80b4a5bf0ac48946a2ca1f" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_snippets"("id", "slug", "name", "code", "created_at", "updated_at", "userId") SELECT "id", "slug", "name", "code", "created_at", "updated_at", "userId" FROM "snippets"`);
        await queryRunner.query(`DROP TABLE "snippets"`);
        await queryRunner.query(`ALTER TABLE "temporary_snippets" RENAME TO "snippets"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "snippets" RENAME TO "temporary_snippets"`);
        await queryRunner.query(`CREATE TABLE "snippets" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "slug" text NOT NULL, "name" text NOT NULL DEFAULT ('Untitled'), "code" text NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer)`);
        await queryRunner.query(`INSERT INTO "snippets"("id", "slug", "name", "code", "created_at", "updated_at", "userId") SELECT "id", "slug", "name", "code", "created_at", "updated_at", "userId" FROM "temporary_snippets"`);
        await queryRunner.query(`DROP TABLE "temporary_snippets"`);
        await queryRunner.query(`DROP TABLE "snippets"`);
        await queryRunner.query(`DROP INDEX "text"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
