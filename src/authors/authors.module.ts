import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { BookAuthorInfrustructureModule } from '../authors/book-authors/book-authors-infrustructure.module';

@Module({
  imports: [BookAuthorInfrustructureModule],
  controllers: [AuthorsController],
})
export class AuthorsModule {}
