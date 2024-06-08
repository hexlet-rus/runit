import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Migrations1699462100238 implements MigrationInterface {
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
            name: 'username',
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
            name: 'recover_hash',
            type: 'varchar(50)',
            isNullable: true,
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
          },
          {
            name: 'slug',
            type: 'varchar(30)',
            isNullable: true,
          },
          {
            name: 'code',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'language',
            type: 'varchar(50)',
            isNullable: true,
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
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "snippets"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
