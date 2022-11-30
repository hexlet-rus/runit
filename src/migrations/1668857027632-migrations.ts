import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1668857027632 implements MigrationInterface {
    name = 'migrations1668857027632'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_snippets" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" character NOT NULL DEFAULT ('Untitled'), "code" character NOT NULL, "created_at" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP), "userId" int NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_snippets"("id", "name", "code", "created_at", "updated_at", "userId") SELECT "id", "name", "code", "created_at", "updated_at", "userId" FROM "snippets"`);
        await queryRunner.query(`DROP TABLE "snippets"`);
        await queryRunner.query(`ALTER TABLE "temporary_snippets" RENAME TO "snippets"`);
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" character NOT NULL, "password" character NOT NULL, "created_at" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "email", "password", "created_at", "updated_at") SELECT "id", "email", "password", "created_at", "updated_at" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" character NOT NULL, "password" character NOT NULL, "created_at" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP), "login" varchar NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_e434774e30f19139e887099b747" UNIQUE ("login"))`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "email", "password", "created_at", "updated_at") SELECT "id", "email", "password", "created_at", "updated_at" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "login" varchar NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_e434774e30f19139e887099b747" UNIQUE ("login"))`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "email", "password", "created_at", "updated_at", "login") SELECT "id", "email", "password", "created_at", "updated_at", "login" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
        await queryRunner.query(`CREATE TABLE "temporary_snippets" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL DEFAULT ('Untitled'), "code" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_snippets"("id", "name", "code", "created_at", "updated_at", "userId") SELECT "id", "name", "code", "created_at", "updated_at", "userId" FROM "snippets"`);
        await queryRunner.query(`DROP TABLE "snippets"`);
        await queryRunner.query(`ALTER TABLE "temporary_snippets" RENAME TO "snippets"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
        await queryRunner.query(`CREATE TABLE "temporary_snippets" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL DEFAULT ('Untitled'), "code" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, CONSTRAINT "FK_8fdfc80b4a5bf0ac48946a2ca1f" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_snippets"("id", "name", "code", "created_at", "updated_at", "userId") SELECT "id", "name", "code", "created_at", "updated_at", "userId" FROM "snippets"`);
        await queryRunner.query(`DROP TABLE "snippets"`);
        await queryRunner.query(`ALTER TABLE "temporary_snippets" RENAME TO "snippets"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "snippets" RENAME TO "temporary_snippets"`);
        await queryRunner.query(`CREATE TABLE "snippets" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL DEFAULT ('Untitled'), "code" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer)`);
        await queryRunner.query(`INSERT INTO "snippets"("id", "name", "code", "created_at", "updated_at", "userId") SELECT "id", "name", "code", "created_at", "updated_at", "userId" FROM "temporary_snippets"`);
        await queryRunner.query(`DROP TABLE "temporary_snippets"`);
        await queryRunner.query(`DROP INDEX "IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`ALTER TABLE "snippets" RENAME TO "temporary_snippets"`);
        await queryRunner.query(`CREATE TABLE "snippets" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" character NOT NULL DEFAULT ('Untitled'), "code" character NOT NULL, "created_at" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP), "userId" int NOT NULL)`);
        await queryRunner.query(`INSERT INTO "snippets"("id", "name", "code", "created_at", "updated_at", "userId") SELECT "id", "name", "code", "created_at", "updated_at", "userId" FROM "temporary_snippets"`);
        await queryRunner.query(`DROP TABLE "temporary_snippets"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" character NOT NULL, "password" character NOT NULL, "created_at" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP), "login" varchar NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_e434774e30f19139e887099b747" UNIQUE ("login"))`);
        await queryRunner.query(`INSERT INTO "users"("id", "email", "password", "created_at", "updated_at", "login") SELECT "id", "email", "password", "created_at", "updated_at", "login" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" character NOT NULL, "password" character NOT NULL, "created_at" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "users"("id", "email", "password", "created_at", "updated_at") SELECT "id", "email", "password", "created_at", "updated_at" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" character NOT NULL DEFAULT ('Untitled'), "email" character NOT NULL, "password" character NOT NULL, "created_at" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "users"("id", "email", "password", "created_at", "updated_at") SELECT "id", "email", "password", "created_at", "updated_at" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
        await queryRunner.query(`ALTER TABLE "snippets" RENAME TO "temporary_snippets"`);
        await queryRunner.query(`CREATE TABLE "snippets" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" character NOT NULL DEFAULT ('Untitled'), "code" character NOT NULL, "created_at" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP), "userId" int NOT NULL, CONSTRAINT "userId" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "snippets"("id", "name", "code", "created_at", "updated_at", "userId") SELECT "id", "name", "code", "created_at", "updated_at", "userId" FROM "temporary_snippets"`);
        await queryRunner.query(`DROP TABLE "temporary_snippets"`);
    }

}
