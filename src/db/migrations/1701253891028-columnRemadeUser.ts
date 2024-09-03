import { MigrationInterface, QueryRunner } from "typeorm";

export class ColumnRemadeUser1701253891028 implements MigrationInterface {
    name = 'ColumnRemadeUser1701253891028'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`username\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`username\``);
    }

}
