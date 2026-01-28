import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCouponsTable1769553229672 implements MigrationInterface {
    name = 'CreateCouponsTable1769553229672'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "coupons" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "discount" integer NOT NULL, CONSTRAINT "PK_d7ea8864a0150183770f3e9a8cb" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "coupons"`);
    }

}
