// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { DataSource } from 'typeorm';

import Publisher from './publishers/entities/publisher.entity';
import Author from './authors/entities/author.entity';
import Book from './books/entities/book.entity';

import { Init1681971630237 } from '../migrations/1681971630237-Init';
import { InitAuthors1681978397829 } from '../migrations/1681978397829-init-authors';
import { InitPublishers1681980913891 } from '../migrations/1681980913891-init-publishers';
import { InitBooks1681989344108 } from '../migrations/1681989344108-init-books';

const { DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

console.log(Author);

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: [Author, Publisher, Book],
  migrations: [
    Init1681971630237,
    InitAuthors1681978397829,
    InitPublishers1681980913891,
    InitBooks1681989344108,
  ],
  migrationsTableName: 'migrations',
});
