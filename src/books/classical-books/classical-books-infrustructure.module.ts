import { Module } from '@nestjs/common';
import { BookService } from '../book.service';
import { ClassicalBooksService } from './classical-books.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import Book from '../entities/book.entity';
import Author from '../../authors/entities/author.entity';
import Publisher from '../../publishers/entities/publisher.entity';
import BookLogs from 'additional-entities/book-logs.entity';
import { BookSubscriber } from '../subscriber/book.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Author, Publisher, BookLogs])],
  providers: [
    { provide: BookService, useClass: ClassicalBooksService },
    BookSubscriber,
  ],
  exports: [BookService],
})
export class ClassicalBooksInfrustructureModule {}
