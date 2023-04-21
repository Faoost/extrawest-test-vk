import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import {
  AuthorsFindAllDecorator,
  AuthorsFindOneDecorator,
} from './authors.controller.decorator';
import { AuthorsService } from './authors.service';
import { JWTAuthGuard } from 'src/guards/jwt-auth.guard';
import Author from './entities/author.entity';

@ApiTags('Authors')
@ApiBearerAuth()
@Controller('authors')
@ApiExtraModels(Author)
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  @AuthorsFindAllDecorator()
  @UseGuards(JWTAuthGuard)
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  @AuthorsFindOneDecorator()
  @UseGuards(JWTAuthGuard)
  findOne(@Param('id') id: string) {
    if (isNaN(+id))
      throw new HttpException(
        `id - '${id}' is Not a Number`,
        HttpStatus.BAD_REQUEST,
      );
    return this.authorsService.findOne(+id);
  }
}
