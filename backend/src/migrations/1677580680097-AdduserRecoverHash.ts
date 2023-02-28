import { MigrationInterface, QueryRunner } from "typeorm"

export class AdduserRecoverHash1677580680097 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "users" ADD COLUMN "recover_hash" varchar(50) DEFAULT NULL`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "users" DROP COLUMN recover_hash`,
        );
    }

}
