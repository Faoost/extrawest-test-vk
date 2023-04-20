import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitBooks1681989344108 implements MigrationInterface {
  name = 'InitBooks1681989344108';
  books = [
    {
      name: 'Harry Potter and the Deathly Hallows (Book 7)',
      isbnCode: '0545010225',
      pages: '200',
      authorId: 2,
      publisherId: 1,
    },
    {
      name: 'Harry Potter And The Goblet Of Fire',
      isbnCode: '0439139597',
      pages: '212',
      authorId: 2,
      publisherId: 1,
    },
    {
      name: 'The Hobbit (or There and Back Again)',
      isbnCode: '0395177111',
      pages: '160',
      authorId: 3,
      publisherId: 2,
    },
    {
      name: 'Romeo and Juliet',
      isbnCode: '1420922548',
      pages: '142',
      authorId: 1,
    },
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const book of this.books) {
      await queryRunner.query(
        `INSERT INTO book(name, isbn_code, pages, author_id, publisher_id) VALUES ($1, $2, $3, $4, $5)`,
        [
          book.name,
          book.isbnCode,
          book.pages,
          book.authorId,
          book.publisherId ?? null,
        ],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const book of this.books) {
      await queryRunner.query(
        `DELETE FROM book WHERE isbn_code = '${book.name}'`,
      );
    }
  }
}
