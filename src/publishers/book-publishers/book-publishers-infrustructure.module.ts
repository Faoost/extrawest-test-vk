import { Module } from '@nestjs/common';
import { PublisherService } from '../publisher.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Publisher from '../entities/publisher.entity';
import { BookPublishersService } from './book-publishers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Publisher])],
  providers: [{ provide: PublisherService, useClass: BookPublishersService }],
  exports: [PublisherService],
})
export class BookPublishersInfrustructureModule {}
