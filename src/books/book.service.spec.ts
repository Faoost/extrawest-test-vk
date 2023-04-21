/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import Book from './entities/book.entity';
import Author from '../authors/entities/author.entity';
import Publisher from '../publishers/entities/publisher.entity';
import { CreateBookBulk } from './dto/create-book-bulk.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

describe('BookService', () => {
  class BooksService extends BookService {
    create(book: CreateBookDto): Promise<Book> {
      return Promise.resolve(new Book());
    }
    createBulk(body: CreateBookBulk): Promise<any> {
      return Promise.resolve();
    }
    update(id: number, book: UpdateBookDto): Promise<any> {
      return Promise.resolve();
    }
    remove(id: number): Promise<Book> {
      return Promise.resolve(new Book());
    }
    validatePublisher(id: number): Promise<Publisher> {
      return Promise.resolve(new Publisher());
    }
    validateAuthor(id: number): Promise<Author> {
      return Promise.resolve(new Author());
    }
    findOne(id: number): Promise<Book> {
      return Promise.resolve(new Book());
    }
    findAll(): Promise<Book[]> {
      return Promise.resolve([new Book()]);
    }
  }
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
