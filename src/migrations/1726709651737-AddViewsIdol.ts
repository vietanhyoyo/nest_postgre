import { MigrationInterface, QueryRunner } from "typeorm";

export class AddViewsIdol1726709651737 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "idol"
            ADD COLUMN "views" integer DEFAULT 0;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "idol"
            DROP COLUMN "views";
        `);
    }

}
