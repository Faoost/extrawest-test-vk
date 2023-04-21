import { Test, TestingModule } from '@nestjs/testing';
import { BookPublishersService } from './book-publishers.service';
import Publisher from '../entities/publisher.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('BookPublishersService', () => {
  let service: BookPublishersService;

  const findPublisherByIdData = {
    id: 1,
    name: 'Bloomsbury Publishing',
    siteLink: 'https://www.bloomsbury.com/',
    createdAt: '2023-04-20T08:14:54.923Z',
    updatedAt: '2023-04-20T08:14:54.923Z',
  };
  const findAllPublishersData = [findPublisherByIdData];
  const PublisherEntityProvider = {
    provide: getRepositoryToken(Publisher),
    useValue: {
      find: jest.fn().mockResolvedValue(findAllPublishersData),
      findOneBy: jest.fn().mockResolvedValue(findPublisherByIdData),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookPublishersService, PublisherEntityProvider],
    }).compile();

    service = module.get<BookPublishersService>(BookPublishersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('.findAll', async () => {
    const publishers = await service.findAll();

    expect(publishers).toEqual(findAllPublishersData);
  });

  it('.findOne', async () => {
    const publisher = await service.findOne(1);

    expect(publisher).toEqual(findPublisherByIdData);
  });
});
