import { Test, TestingModule } from '@nestjs/testing';
import { ClassicalBooksService } from './classical-books.service';

describe('ClassicalBooksService', () => {
  let service: ClassicalBooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassicalBooksService],
    }).compile();

    service = module.get<ClassicalBooksService>(ClassicalBooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
