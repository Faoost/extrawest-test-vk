import { Test, TestingModule } from '@nestjs/testing';
import { AuthorService } from './author.service';
import Author from './entities/author.entity';

describe('AuthorService', () => {
  class AuthorsService extends AuthorService {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    findOne(id: number): Promise<Author> {
      return Promise.resolve(new Author());
    }
    findAll(): Promise<Author[]> {
      return Promise.resolve([new Author()]);
    }
  }
  let service: AuthorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorsService],
    }).compile();

    service = module.get<AuthorsService>(AuthorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
