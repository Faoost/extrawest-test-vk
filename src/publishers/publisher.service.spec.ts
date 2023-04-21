import { Test, TestingModule } from '@nestjs/testing';
import { PublisherService } from './publisher.service';
import Publisher from './entities/publisher.entity';

describe('PublisherService', () => {
  class PublishersService extends PublisherService {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    findOne(id: number): Promise<Publisher> {
      return Promise.resolve(new Publisher());
    }
    findAll(): Promise<Publisher[]> {
      return Promise.resolve([new Publisher()]);
    }
  }
  let service: PublishersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublishersService],
    }).compile();

    service = module.get<PublishersService>(PublishersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
