import { ApiProperty } from '@nestjs/swagger';
import {
  IsISBN,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    required: false,
  })
  publisherId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  authorId: number;

  @IsNotEmpty()
  @IsISBN()
  @ApiProperty()
  isbnCode: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  pages: number;
}
