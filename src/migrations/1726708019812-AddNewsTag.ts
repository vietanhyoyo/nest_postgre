import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewsTag1726708019812 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create the news table
        await queryRunner.query(`
            CREATE TABLE "news" (
                "news_id" SERIAL NOT NULL,
                "title" varchar NOT NULL,
                "thumbnail" varchar NOT NULL,
                "author" varchar DEFAULT '',
                "description" varchar DEFAULT '',
                "content" varchar NOT NULL,
                "views" integer DEFAULT 0,
                "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY ("news_id")
            )
        `);

        // Create the many-to-many relationship table between news and tags
        await queryRunner.query(`
            CREATE TABLE "news_tags" (
                "news_id" integer NOT NULL,
                "tag_id" integer NOT NULL,
                CONSTRAINT "FK_news_tags_news" FOREIGN KEY ("news_id") REFERENCES "news"("news_id") ON DELETE CASCADE,
                CONSTRAINT "FK_news_tags_tag" FOREIGN KEY ("tag_id") REFERENCES "tag"("tag_id") ON DELETE CASCADE
            )
        `);

        // Indexes to optimize querying the relationship
        await queryRunner.query(`
            CREATE INDEX "IDX_news_tags_news_id" ON "news_tags" ("news_id");
        `);

        await queryRunner.query(`
            CREATE INDEX "IDX_news_tags_tag_id" ON "news_tags" ("tag_id");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop the many-to-many relationship table
        await queryRunner.query(`
            DROP TABLE "news_tags";
        `);

        // Drop the news table
        await queryRunner.query(`
            DROP TABLE "news";
        `);
    }
}
