import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { PublisherService } from './publisher.service';
import { JWTAuthGuard } from '../guards/jwt-auth.guard';
import Publisher from './entities/publisher.entity';
import {
  PublishersFindAllDecorator,
  PublishersFindOneDecorator,
} from './publishers.controller.decorator';

@ApiTags('Publishers')
@ApiBearerAuth()
@Controller('publishers')
@ApiExtraModels(Publisher)
export class PublishersController {
  constructor(private readonly publisherService: PublisherService) {}

  @Get()
  @PublishersFindAllDecorator()
  @UseGuards(JWTAuthGuard)
  findAll() {
    return this.publisherService.findAll();
  }

  @Get(':id')
  @PublishersFindOneDecorator()
  @UseGuards(JWTAuthGuard)
  findOne(@Param('id') id: string) {
    if (isNaN(+id))
      throw new HttpException(
        `id - '${id}' is Not a Number`,
        HttpStatus.BAD_REQUEST,
      );
    return this.publisherService.findOne(+id);
  }
}
