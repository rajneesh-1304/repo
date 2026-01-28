import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateImagesTable1769552750751 implements MigrationInterface {
    name = 'CreateImagesTable1769552750751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "images" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "images"`);
    }

}
