import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('author')
export default class Author {
  @ApiProperty()
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  id: number;

  @ApiProperty()
  @Column({ name: 'name' })
  name: string;

  @ApiProperty({
    example: '2023-04-21T14:11:54.000Z',
    description: 'Date of author creation',
    type: 'string',
    format: 'date-time',
  })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({
    example: '2023-04-21T14:11:54.000Z',
    description: 'Date of author last update',
    type: 'string',
    format: 'date-time',
  })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
