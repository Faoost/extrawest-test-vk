import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Publisher from '../entities/publisher.entity';

@Injectable()
export class BookPublishersService {
  constructor(
    @InjectRepository(Publisher)
    private publishersRepository: Repository<Publisher>,
  ) {}

  findAll(): Promise<Publisher[]> {
    return this.publishersRepository.find();
  }

  findOne(id: number): Promise<Publisher | null> {
    return this.publishersRepository.findOneBy({ id });
  }
}
