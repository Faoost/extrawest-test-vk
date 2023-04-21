import { Test, TestingModule } from '@nestjs/testing';
import { ClassicalBooksService } from './classical-books.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import Author from '../../authors/entities/author.entity';
import Publisher from '../../publishers/entities/publisher.entity';
import Book from '../entities/book.entity';

describe('ClassicalBooksService', () => {
  let service: ClassicalBooksService;

  const findAuthorByIdData = {
    id: 1,
    name: 'William Shakespeare',
    createdAt: '2023-04-20T08:14:54.923Z',
    updatedAt: '2023-04-20T08:14:54.923Z',
  };
  const AuthorEntityProvider = {
    provide: getRepositoryToken(Author),
    useValue: {
      findOneBy: jest.fn().mockResolvedValue(findAuthorByIdData),
    },
  };

  const findPublisherByIdData = {
    id: 1,
    name: 'Bloomsbury Publishing',
    siteLink: 'https://www.bloomsbury.com/',
    createdAt: '2023-04-20T08:14:54.923Z',
    updatedAt: '2023-04-20T08:14:54.923Z',
  };
  const PublisherEntityProvider = {
    provide: getRepositoryToken(Publisher),
    useValue: {
      findOneBy: jest.fn().mockResolvedValue(findPublisherByIdData),
    },
  };

  const defaultBookData = {
    id: 1,
    name: 'Harry Potter and the Deathly Hallows (Book 7)',
    isbnCode: '0545010225',
    pages: 200,
    createdAt: '2023-04-20T08:33:31.017Z',
    updatedAt: '2023-04-20T08:33:31.017Z',
    publisherId: findPublisherByIdData,
    authorId: findAuthorByIdData,
  };
  const createBookData = {
    name: 'book1',
    publisherId: 1,
    authorId: 1,
    isbnCode: '0747532745',
    pages: 100,
  };
  const saveBookMock = jest.fn().mockResolvedValue(createBookData);
  const BooksEntityProvider = {
    provide: getRepositoryToken(Book),
    useValue: {
      find: jest.fn().mockResolvedValue([defaultBookData]),
      findOne: jest.fn().mockResolvedValue(defaultBookData),
      save: saveBookMock,
      update: jest.fn().mockResolvedValue(createBookData),
      remove: jest.fn().mockResolvedValue(createBookData),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClassicalBooksService,
        AuthorEntityProvider,
        PublisherEntityProvider,
        BooksEntityProvider,
      ],
    }).compile();

    service = module.get<ClassicalBooksService>(ClassicalBooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('.findAll', async () => {
    const books = await service.findAll();

    expect(books).toEqual([defaultBookData]);
  });

  it('.findOne', async () => {
    const book = await service.findOne(1);

    expect(book).toEqual(defaultBookData);
  });

  it('.create', async () => {
    const book = await service.create(createBookData);

    expect(book).toEqual(createBookData);
  });

  it('.createBulk', async () => {
    saveBookMock.mockResolvedValueOnce(
      Promise.reject({
        status: 'rejected',
        reason: 'some reason',
      }),
    );
    const result = await service.createBulk({
      books: [createBookData, createBookData],
    });

    expect(result.createdBooks).toEqual([createBookData]);
    expect(result.booksFailedToCreate[0].failedBook).toEqual(createBookData);
  });

  it('.update', async () => {
    const book = await service.update(1, createBookData);

    expect(book).toEqual(createBookData);
  });

  it('.remove', async () => {
    const book = await service.remove(1);

    expect(book).toEqual(createBookData);
  });
});
