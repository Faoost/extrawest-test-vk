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
import { AuthorService } from './author.service';
import { JWTAuthGuard } from 'src/guards/jwt-auth.guard';
import Author from './entities/author.entity';

@ApiTags('Authors')
@ApiBearerAuth()
@Controller('authors')
@ApiExtraModels(Author)
export class AuthorsController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  @AuthorsFindAllDecorator()
  @UseGuards(JWTAuthGuard)
  findAll() {
    return this.authorService.findAll();
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
    return this.authorService.findOne(+id);
  }
}
