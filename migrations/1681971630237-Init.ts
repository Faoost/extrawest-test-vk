import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1681971630237 implements MigrationInterface {
  name = 'Init1681971630237';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "publisher" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "siteLink" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_70a5936b43177f76161724da3e6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "author" ("id" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "book" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "isbnCode" character varying NOT NULL, "pages" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "publisherIdId" integer, "authorIdId" integer, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "book" ADD CONSTRAINT "FK_e45550b8298287a71e24202344e" FOREIGN KEY ("publisherIdId") REFERENCES "publisher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "book" ADD CONSTRAINT "FK_121ecc5c87a63a229897fba4a35" FOREIGN KEY ("authorIdId") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "book" DROP CONSTRAINT "FK_121ecc5c87a63a229897fba4a35"`,
    );
    await queryRunner.query(
      `ALTER TABLE "book" DROP CONSTRAINT "FK_e45550b8298287a71e24202344e"`,
    );
    await queryRunner.query(`DROP TABLE "book"`);
    await queryRunner.query(`DROP TABLE "author"`);
    await queryRunner.query(`DROP TABLE "publisher"`);
  }
}
