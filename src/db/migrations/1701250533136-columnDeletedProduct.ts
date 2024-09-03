import { MigrationInterface, QueryRunner } from "typeorm";

export class ColumnDeletedProduct1701250533136 implements MigrationInterface {
    name = 'ColumnDeletedProduct1701250533136'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`metadescription\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`metadescription\` varchar(255) NOT NULL`);
    }

}
