import { Injectable } from '@nestjs/common';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PublishersService {
  constructor(private configService: ConfigService) {}

  create(createPublisherDto: CreatePublisherDto) {
    return 'This action adds a new publisher';
  }

  findAll() {
    return `This action returns all publishers ${this.configService.get(
      'DB_USERNAME',
    )}`;
  }

  findOne(id: number) {
    return `This action returns a #${id} publisher`;
  }

  update(id: number, updatePublisherDto: UpdatePublisherDto) {
    return `This action updates a #${id} publisher`;
  }

  remove(id: number) {
    return `This action removes a #${id} publisher`;
  }
}
