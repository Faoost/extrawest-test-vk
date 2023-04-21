import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import Author from './entities/author.entity';

export function AuthorsFindAllDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all authors' }),
    ApiOkResponse({
      schema: {
        type: 'array',
        items: { $ref: getSchemaPath(Author) },
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

export function AuthorsFindOneDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Get author by id' }),
    ApiOkResponse({
      schema: {
        type: 'object',
        $ref: getSchemaPath(Author),
      },
      description: '200. Success. Returns an author',
    }),
    ApiNotFoundResponse({
      description: '404. NotFoundException. Author was not found',
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
