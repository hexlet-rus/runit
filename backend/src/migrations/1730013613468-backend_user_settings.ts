import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class BackendUserSettings1730013613468 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_settings',
        columns: [
          {
            name: 'settings_id',
            type: 'integer',
            isGenerated: true,
            generatedIdentity: 'ALWAYS',
            generationStrategy: 'increment',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'language',
            type: 'varchar(50)',
            isNullable: false,
          },

          {
            name: 'theme',
            type: 'varchar(50)',
            isNullable: false,
          },
          {
            name: 'avatar_base64',
            type: 'text',
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
    await queryRunner.query(`DROP TABLE "user_settings"`);
  }
}
