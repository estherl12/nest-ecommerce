import { MigrationInterface, QueryRunner } from "typeorm";

export class ColumnDeltedUser1701252976461 implements MigrationInterface {
    name = 'ColumnDeltedUser1701252976461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`username\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`username\` varchar(255) NOT NULL`);
    }

}
