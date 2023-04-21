import { CreateBookDto } from './dto/create-book.dto';
import { CreateBookBulk } from './dto/create-book-bulk.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import Book from './entities/book.entity';
import Author from '../authors/entities/author.entity';
import Publisher from '../publishers/entities/publisher.entity';

export abstract class BookService {
  abstract create(book: CreateBookDto): Promise<Book>;

  abstract createBulk(body: CreateBookBulk): Promise<any>;

  abstract findAll(): Promise<Book[]>;

  abstract findOne(id: number): Promise<Book | null>;

  abstract update(id: number, book: UpdateBookDto): Promise<any>;

  abstract remove(id: number): Promise<Book>;

  abstract validatePublisher(id: number): Promise<Publisher>;

  abstract validateAuthor(id: number): Promise<Author>;
}
