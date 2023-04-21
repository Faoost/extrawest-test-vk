import { applyDecorators } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import Book from './entities/book.entity';
import BulkCreateBookResponceSchema from './schemas/bulk-book-create-responce.schema';

export function BookCreateDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Create book' }),
    ApiCreatedResponse({
      description: 'The book has been successfully created.',
      type: Book,
    }),
  );
}

export function BookCreateBulkDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Create books in bulk' }),
    ApiCreatedResponse({ schema: BulkCreateBookResponceSchema }),
  );
}

export function BookFindAllDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all books' }),
    ApiOkResponse({
      schema: {
        type: 'array',
        items: { $ref: getSchemaPath(Book) },
      },
    }),
    ApiUnauthorizedResponse({
      schema: {
        type: 'object',
        example: {
          message: 'string',
        },
      },
      description: '401. UnauthorizedException.',
    }),
  );
}

export function BookFindOneDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Get book by id' }),
    ApiOkResponse({
      schema: {
        type: 'object',
        $ref: getSchemaPath(Book),
      },
      description: '200. Success. Returns a book',
    }),
    ApiNotFoundResponse({
      description: '404. NotFoundException. Book was not found',
    }),
    ApiUnauthorizedResponse({
      schema: {
        type: 'object',
        example: {
          message: 'string',
        },
      },
      description: '401. UnauthorizedException.',
    }),
    ApiParam({ name: 'id', type: Number }),
  );
}

export function BookUpdateByIdDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Update book by id' }),
    ApiOkResponse({
      schema: {
        type: 'object',
        description: 'TypeORM update responce object',
      },
      description: '200. Success. Returns affected count, sould be 1',
    }),
  );
}

export function BookDeleteByIdDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete book by id' }),
    ApiOkResponse({
      schema: {
        type: 'object',
        $ref: getSchemaPath(Book),
      },
      description: '200. Success. Returns deleted book',
    }),
  );
}
