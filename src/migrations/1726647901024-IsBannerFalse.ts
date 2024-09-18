import { MigrationInterface, QueryRunner } from "typeorm";

export class IsBannerFalse1726647901024 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Cập nhật tất cả các giá trị is_banner thành false
        await queryRunner.query(`UPDATE "idol" SET "is_banner" = false WHERE "is_banner" = true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Hoàn tác thay đổi: Cập nhật tất cả các giá trị is_banner thành true
        await queryRunner.query(`UPDATE "idol" SET "is_banner" = true WHERE "is_banner" = false`);
    }

}
