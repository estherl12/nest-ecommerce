import { MigrationInterface, QueryRunner } from "typeorm";

export class PostRefactory1701248529232 implements MigrationInterface {
    name = 'PostRefactory1701248529232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`image_entity\` CHANGE \`image\` \`photo\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`image_entity\` DROP COLUMN \`photo\``);
        await queryRunner.query(`ALTER TABLE \`image_entity\` ADD \`photo\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`image_entity\` DROP COLUMN \`photo\``);
        await queryRunner.query(`ALTER TABLE \`image_entity\` ADD \`photo\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`image_entity\` CHANGE \`photo\` \`image\` varchar(255) NOT NULL`);
    }

}
