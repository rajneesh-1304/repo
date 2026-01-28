import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitMigration1769504885371 implements MigrationInterface {
  name = 'InitMigration1769504885371';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "wishlist" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "productId" integer NOT NULL, CONSTRAINT "PK_620bff4a240d66c357b5d820eaa" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_items" ADD "sellerId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_items" ADD "sellerId" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "order_items" DROP COLUMN "sellerId"`);
    await queryRunner.query(`ALTER TABLE "cart_items" DROP COLUMN "sellerId"`);
    await queryRunner.query(`DROP TABLE "wishlist"`);
  }
}
