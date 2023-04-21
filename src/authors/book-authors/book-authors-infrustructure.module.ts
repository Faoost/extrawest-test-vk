import { Module } from '@nestjs/common';
import { AuthorService } from '../author.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Author from '../entities/author.entity';
import { BookAuthorsService } from './book-authors.service';

@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  providers: [{ provide: AuthorService, useClass: BookAuthorsService }],
  exports: [AuthorService],
})
export class BookAuthorInfrustructureModule {}
