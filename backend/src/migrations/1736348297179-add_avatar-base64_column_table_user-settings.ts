import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class Migrations1736348297179 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user_settings',
      new TableColumn({
        name: 'avatar_base64',
        type: 'text',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user_settings', 'avatar_base64');
  }
}
