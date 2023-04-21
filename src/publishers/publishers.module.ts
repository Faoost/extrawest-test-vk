import { Module } from '@nestjs/common';
import { PublishersController } from './publishers.controller';
import { BookPublishersInfrustructureModule } from '../publishers/book-publishers/book-publishers-infrustructure.module';

@Module({
  imports: [BookPublishersInfrustructureModule],
  controllers: [PublishersController],
})
export class PublishersModule {}
