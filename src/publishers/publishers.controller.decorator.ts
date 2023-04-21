import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import Publisher from './entities/publisher.entity';

export function PublishersFindAllDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all publishers' }),
    ApiOkResponse({
      schema: {
        properties: {
          results: {
            type: 'array',
            items: { $ref: getSchemaPath(Publisher) },
          },
        },
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

export function PublishersFindOneDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Get publisher by id' }),
    ApiOkResponse({
      schema: {
        type: 'object',
        $ref: getSchemaPath(Publisher),
      },
      description: '200. Success. Returns a publisher',
    }),
    ApiNotFoundResponse({
      description: '404. NotFoundException. Publisher was not found',
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
