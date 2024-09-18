import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddIsBanner1726645024814 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('idol', new TableColumn({
            name: 'is_banner',
            type: 'boolean',
            isNullable: false,
            default: true
        }));

        // Cập nhật tất cả các bản ghi hiện có, đặt is_banner = true
        await queryRunner.query(`UPDATE "idol" SET "is_banner" = true WHERE "is_banner" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('idol', 'is_banner');
    }

}
