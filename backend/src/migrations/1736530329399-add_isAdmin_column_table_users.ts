import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddIsAdminColumnTableUsers1736530329399
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'isAdmin',
        type: 'boolean',
        default: false,
      }),
    );

    const adminEmail = 'test@test.ru';

    await queryRunner.query(
      `UPDATE users SET isAdmin = true WHERE email = $1`,
      [adminEmail],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'isAdmin');
  }
}
