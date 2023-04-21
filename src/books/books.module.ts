import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';

import { ClassicalBooksInfrustructureModule } from '../books/classical-books/classical-books-infrustructure.module';

@Module({
  imports: [ClassicalBooksInfrustructureModule],
  controllers: [BooksController],
})
export class BooksModule {}
