"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrations1673189643179 = void 0;
class migrations1673189643179 {
    constructor() {
        this.name = 'migrations1673189643179';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "login" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_2d443082eccd5198f95f2a36e2c" UNIQUE ("login"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
        await queryRunner.query(`CREATE TABLE "snippets" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL DEFAULT ('Untitled'), "code" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_snippets" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL DEFAULT ('Untitled'), "code" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, CONSTRAINT "FK_8fdfc80b4a5bf0ac48946a2ca1f" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_snippets"("id", "name", "code", "created_at", "updated_at", "userId") SELECT "id", "name", "code", "created_at", "updated_at", "userId" FROM "snippets"`);
        await queryRunner.query(`DROP TABLE "snippets"`);
        await queryRunner.query(`ALTER TABLE "temporary_snippets" RENAME TO "snippets"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "snippets" RENAME TO "temporary_snippets"`);
        await queryRunner.query(`CREATE TABLE "snippets" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL DEFAULT ('Untitled'), "code" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer)`);
        await queryRunner.query(`INSERT INTO "snippets"("id", "name", "code", "created_at", "updated_at", "userId") SELECT "id", "name", "code", "created_at", "updated_at", "userId" FROM "temporary_snippets"`);
        await queryRunner.query(`DROP TABLE "temporary_snippets"`);
        await queryRunner.query(`DROP TABLE "snippets"`);
        await queryRunner.query(`DROP INDEX "IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
exports.migrations1673189643179 = migrations1673189643179;
//# sourceMappingURL=1673189643179-migrations.js.map