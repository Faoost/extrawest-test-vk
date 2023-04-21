import { Test, TestingModule } from '@nestjs/testing';
import { BookAuthorsService } from './book-authors.service';
import Author from '../entities/author.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('BookAuthorsService', () => {
  let service: BookAuthorsService;

  const findAuthorByIdData = {
    id: 1,
    name: 'William Shakespeare',
    createdAt: '2023-04-20T08:14:54.923Z',
    updatedAt: '2023-04-20T08:14:54.923Z',
  };
  const findAllAuthorsData = [findAuthorByIdData];
  const AuthorEntityProvider = {
    provide: getRepositoryToken(Author),
    useValue: {
      find: jest.fn().mockResolvedValue(findAllAuthorsData),
      findOneBy: jest.fn().mockResolvedValue(findAuthorByIdData),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookAuthorsService, AuthorEntityProvider],
    }).compile();

    service = module.get<BookAuthorsService>(BookAuthorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('.findAll', async () => {
    const authors = await service.findAll();

    expect(authors).toEqual(findAllAuthorsData);
  });

  it('.findOne', async () => {
    const author = await service.findOne(1);

    expect(author).toEqual(findAuthorByIdData);
  });
});
