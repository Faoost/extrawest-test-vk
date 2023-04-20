import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import Book from './entities/book.entity';
import Author from 'src/authors/entities/author.entity';
import Publisher from 'src/publishers/entities/publisher.entity';
import BookLogs from 'additional-entities/book-logs.entity';

import { BookSubscriber } from './subscriber/book.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Author, Publisher, BookLogs])],
  controllers: [BooksController],
  providers: [BooksService, BookSubscriber],
})
export class BooksModule {}
