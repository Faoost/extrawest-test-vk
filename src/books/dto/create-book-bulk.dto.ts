import { ArrayNotEmpty, ArrayUnique } from 'class-validator';
import { CreateBookDto } from './create-book.dto';

export class CreateBookBulk {
  @ArrayNotEmpty()
  @ArrayUnique((book) => book.isbnCode)
  books: CreateBookDto[];
}
