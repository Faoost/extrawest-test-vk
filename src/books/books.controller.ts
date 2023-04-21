import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import {
  BookCreateDecorator,
  BookCreateBulkDecorator,
  BookFindAllDecorator,
  BookFindOneDecorator,
  BookUpdateByIdDecorator,
  BookDeleteByIdDecorator,
} from './books.controller.decorator';

import { BooksService } from './books.service';

import { CreateBookDto } from './dto/create-book.dto';
import { CreateBookBulk } from './dto/create-book-bulk.dto';
import { UpdateBookDto } from './dto/update-book.dto';

import { JWTAuthGuard } from '../guards/jwt-auth.guard';

import Book from './entities/book.entity';

@ApiTags('Books')
@ApiBearerAuth()
@Controller('books')
@ApiExtraModels(Book)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @BookCreateDecorator()
  @UseGuards(JWTAuthGuard)
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Post('/bulk')
  @BookCreateBulkDecorator()
  @UseGuards(JWTAuthGuard)
  createBulk(@Body() createBookDto: CreateBookBulk) {
    return this.booksService.createBulk(createBookDto);
  }

  @Get()
  @BookFindAllDecorator()
  @UseGuards(JWTAuthGuard)
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  @BookFindOneDecorator()
  @UseGuards(JWTAuthGuard)
  async findOne(@Param('id') id: string) {
    if (isNaN(+id))
      throw new HttpException(
        `id - '${id}' is Not a Number`,
        HttpStatus.BAD_REQUEST,
      );
    return this.booksService.findOne(+id);
  }

  @Patch(':id')
  @BookUpdateByIdDecorator()
  @UseGuards(JWTAuthGuard)
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    if (isNaN(+id))
      throw new HttpException(
        `id - '${id}' is Not a Number`,
        HttpStatus.BAD_REQUEST,
      );
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  @BookDeleteByIdDecorator()
  @UseGuards(JWTAuthGuard)
  remove(@Param('id') id: string) {
    if (isNaN(+id))
      throw new HttpException(
        `id - '${id}' is Not a Number`,
        HttpStatus.BAD_REQUEST,
      );
    return this.booksService.remove(+id);
  }
}
