import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeIsbnCodeUnique1682002172607 implements MigrationInterface {
  name = 'MakeIsbnCodeUnique1682002172607';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "book" ADD CONSTRAINT "UQ_32df48724134d70c1b21b703e66" UNIQUE ("isbn_code")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "book" DROP CONSTRAINT "UQ_32df48724134d70c1b21b703e66"`,
    );
  }
}
