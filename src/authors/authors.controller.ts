import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { JWTAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @Get()
  @UseGuards(JWTAuthGuard)
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  @UseGuards(JWTAuthGuard)
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JWTAuthGuard)
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.update(+id, updateAuthorDto);
  }

  @Delete(':id')
  @UseGuards(JWTAuthGuard)
  remove(@Param('id') id: string) {
    return this.authorsService.remove(+id);
  }
}
