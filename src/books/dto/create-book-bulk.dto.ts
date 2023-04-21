import { ArrayNotEmpty, ArrayUnique } from 'class-validator';
import { CreateBookDto } from './create-book.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookBulk {
  @ArrayNotEmpty()
  @ArrayUnique((book) => book.isbnCode)
  @ApiProperty({
    isArray: true,
    type: CreateBookDto,
  })
  books: CreateBookDto[];
}
