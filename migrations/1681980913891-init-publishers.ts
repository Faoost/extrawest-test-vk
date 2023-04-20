import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitPublishers1681980913891 implements MigrationInterface {
  name = 'InitPublishers1681980913891';
  publishers = [
    { name: 'Bloomsbury Publishing', siteLink: 'https://www.bloomsbury.com/' },
    { name: 'George Allen & Unwin, Ltd.' },
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const publisher of this.publishers) {
      await queryRunner.query(
        `INSERT INTO publisher(name, site_link) VALUES ($1, $2)`,
        [publisher.name, publisher.siteLink ?? null],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const publisher of this.publishers) {
      await queryRunner.query(
        `DELETE FROM publisher WHERE name = '${publisher.name}'`,
      );
    }
  }
}
