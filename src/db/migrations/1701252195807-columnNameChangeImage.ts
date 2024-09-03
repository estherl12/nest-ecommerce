import { MigrationInterface, QueryRunner } from "typeorm";

export class ColumnNameChangeImage1701252195807 implements MigrationInterface {
    name = 'ColumnNameChangeImage1701252195807'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`image_entity\` CHANGE \`photo\` \`image\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`image_entity\` DROP COLUMN \`image\``);
        await queryRunner.query(`ALTER TABLE \`image_entity\` ADD \`image\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`image_entity\` DROP COLUMN \`image\``);
        await queryRunner.query(`ALTER TABLE \`image_entity\` ADD \`image\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`image_entity\` CHANGE \`image\` \`photo\` varchar(255) NOT NULL`);
    }

}
