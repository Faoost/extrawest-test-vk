import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { CreateBookBulk } from './dto/create-book-bulk.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Book from './entities/book.entity';
import Author from '../authors/entities/author.entity';
import Publisher from '../publishers/entities/publisher.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
    @InjectRepository(Publisher)
    private publishersRepository: Repository<Publisher>,
  ) {}

  async create(book: CreateBookDto): Promise<Book> {
    let publisher: Publisher | null = null;
    let author: Author;

    try {
      if (book.publisherId) {
        publisher = await this.validatePublisher(book.publisherId);
      }
      author = await this.validateAuthor(book.authorId);
    } catch (error) {
      console.log('error on validating publisher or author', error);
      throw error;
    }

    return this.booksRepository.save({
      name: book.name,
      authorId: author,
      publisherId: publisher,
      isbnCode: book.isbnCode,
      pages: book.pages,
    });
  }

  async createBulk(body: CreateBookBulk) {
    const createdBooks = [];
    const booksFailedToCreate = [];

    while (body.books.length) {
      const chunk = body.books.splice(0, 20);
      const createPromises = [];

      for (const book of chunk) {
        createPromises.push(this.create(book));
      }

      await Promise.allSettled(createPromises).then((results) => {
        results.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            createdBooks.push(result.value);
          }

          if (result.status === 'rejected') {
            booksFailedToCreate.push({
              failedBook: chunk[index],
              reason: result.reason,
            });
          }
        });
      });
    }

    return { createdBooks, booksFailedToCreate };
  }

  findAll(): Promise<Book[]> {
    return this.booksRepository.find();
  }

  findOne(id: number): Promise<Book | null> {
    return this.booksRepository.findOneBy({ id });
  }

  async update(id: number, book: UpdateBookDto) {
    let publisher: Publisher | null = null;
    let author: Author;

    try {
      if (book.publisherId) {
        publisher = await this.validatePublisher(book.publisherId);
      }
      author = await this.validateAuthor(book.authorId);
    } catch (error) {
      console.log('error on validating publisher or author', error);
      throw error;
    }

    return this.booksRepository.update(
      { id },
      {
        name: book.name,
        authorId: author,
        publisherId: publisher,
        isbnCode: book.isbnCode,
        pages: book.pages,
      },
    );
  }

  remove(id: number) {
    return this.booksRepository.delete({ id });
  }

  async validatePublisher(id: number): Promise<Publisher> {
    const publisher = await this.publishersRepository.findOneBy({
      id,
    });

    if (!publisher)
      throw new HttpException(
        `Cant find publisher with id - '${id}'`,
        HttpStatus.BAD_REQUEST,
      );

    return publisher;
  }

  async validateAuthor(id: number): Promise<Author> {
    const author = await this.authorsRepository.findOneBy({
      id,
    });

    if (!author)
      throw new HttpException(
        `Cant find author with id - '${id}'`,
        HttpStatus.BAD_REQUEST,
      );

    return author;
  }
}
