import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitBookLogs1682012543745 implements MigrationInterface {
  name = 'InitBookLogs1682012543745';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "book_logs" ("id" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "name" character varying NOT NULL, "entity" json NOT NULL, "changed_to" json, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8a2fab7a25d34b05e06ac49aad5" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "book_logs"`);
  }
}
