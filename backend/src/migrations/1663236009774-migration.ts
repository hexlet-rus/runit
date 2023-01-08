/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class migration1663236009774 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
      }),
    );

    await queryRunner.createTable(
      new Table({
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
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
    await queryRunner.dropTable('snippets');
  }
}
