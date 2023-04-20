import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1681971630237 implements MigrationInterface {
  name = 'Init1681971630237';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "publisher" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "site_link" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_70a5936b43177f76161724da3e6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "author" ("id" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "book" ("id" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "name" character varying NOT NULL, "isbn_code" character varying, "pages" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "publisher_id" integer, "author_id" integer, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "book" ADD CONSTRAINT "FK_baaa4c0d27070b4125aa5a81e25" FOREIGN KEY ("publisher_id") REFERENCES "publisher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "book" ADD CONSTRAINT "FK_24b753b0490a992a6941451f405" FOREIGN KEY ("author_id") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "book" DROP CONSTRAINT "FK_24b753b0490a992a6941451f405"`,
    );
    await queryRunner.query(
      `ALTER TABLE "book" DROP CONSTRAINT "FK_baaa4c0d27070b4125aa5a81e25"`,
    );
    await queryRunner.query(`DROP TABLE "book"`);
    await queryRunner.query(`DROP TABLE "author"`);
    await queryRunner.query(`DROP TABLE "publisher"`);
  }
}
