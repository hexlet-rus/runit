"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migration1663236009774 = void 0;
const typeorm_1 = require("typeorm");
class migration1663236009774 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isGenerated: true,
                    generatedIdentity: 'ALWAYS',
                    generationStrategy: 'increment',
                    isNullable: false,
                    isPrimary: true,
                },
                {
                    name: 'login',
                    type: 'varchar(20)',
                    isNullable: false,
                    isUnique: true,
                },
                {
                    name: 'email',
                    type: 'varchar(60)',
                    isNullable: false,
                    isUnique: true,
                },
                {
                    name: 'password',
                    type: 'varchar(60)',
                    isNullable: false,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    isNullable: false,
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    isNullable: false,
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }));
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'snippets',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isGenerated: true,
                    generatedIdentity: 'ALWAYS',
                    generationStrategy: 'increment',
                    isNullable: false,
                    isPrimary: true,
                },
                {
                    name: 'name',
                    type: 'varchar(30)',
                    isNullable: false,
                    default: "'Untitled'",
                },
                {
                    name: 'code',
                    type: 'text',
                    isNullable: false,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    isNullable: false,
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    isNullable: false,
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'userId',
                    type: 'int',
                },
            ],
            foreignKeys: [
                {
                    name: 'userId',
                    columnNames: ['userId'],
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    onUpdate: 'cascade',
                    onDelete: 'cascade',
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('users');
        await queryRunner.dropTable('snippets');
    }
}
exports.migration1663236009774 = migration1663236009774;
//# sourceMappingURL=1663236009774-migration.js.map