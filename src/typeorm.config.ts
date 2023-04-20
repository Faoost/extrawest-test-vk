// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { DataSource } from 'typeorm';

import Publisher from './publishers/entities/publisher.entity';
import Author from './authors/entities/author.entity';
import Book from './books/entities/book.entity';

import { Init1681971630237 } from '../migrations/1681971630237-Init';

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
  migrations: [Init1681971630237],
  migrationsTableName: 'migrations',
});
