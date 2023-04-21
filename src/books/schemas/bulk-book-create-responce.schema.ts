import { getSchemaPath } from '@nestjs/swagger';
import Book from '../entities/book.entity';
import { CreateBookDto } from '../dto/create-book.dto';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

const BulkCreateBookResponceSchema: SchemaObject = {
  type: 'object',
  properties: {
    createdBooks: {
      type: 'array',
      items: { $ref: getSchemaPath(Book) },
    },
    booksFailedToCreate: {
      properties: {
        failedBook: {
          type: 'array',
          items: { $ref: getSchemaPath(CreateBookDto) },
        },
        reason: {
          type: 'any',
        },
      },
    },
  },
};

export default BulkCreateBookResponceSchema;
