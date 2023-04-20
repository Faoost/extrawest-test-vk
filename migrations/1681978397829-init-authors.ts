import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitAuthors1681978397829 implements MigrationInterface {
  name = 'InitAuthors1681978397829';
  authors = [
    { name: 'William Shakespeare' },
    { name: 'Joanne Rowling' },
    { name: 'John Ronald Reuel Tolkien' },
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const author of this.authors) {
      await queryRunner.query(
        `INSERT INTO author(name) VALUES ('${author.name}')`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const author of this.authors) {
      await queryRunner.query(
        `DELETE FROM author WHERE name = '${author.name}'`,
      );
    }
  }
}
