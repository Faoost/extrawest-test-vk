import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Book from './entities/book.entity';
import Author from 'src/authors/entities/author.entity';
import Publisher from 'src/publishers/entities/publisher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Author, Publisher])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
