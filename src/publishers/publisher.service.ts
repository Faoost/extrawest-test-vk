import Publisher from './entities/publisher.entity';

export abstract class PublisherService {
  abstract findAll(): Promise<Publisher[]>;

  abstract findOne(id: number): Promise<Publisher | null>;
}
