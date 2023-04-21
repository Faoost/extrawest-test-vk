import { Test, TestingModule } from '@nestjs/testing';
import { BookPublishersService } from './book-publishers.service';

describe('PublishersService', () => {
  let service: BookPublishersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookPublishersService],
    }).compile();

    service = module.get<BookPublishersService>(BookPublishersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
