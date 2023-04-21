import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Publisher from '../../publishers/entities/publisher.entity';
import Author from '../../authors/entities/author.entity';

@Entity('book')
export default class Book {
  @ApiProperty()
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  id: number;

  @ApiProperty()
  @Column({ name: 'name' })
  name: string;

  @ApiProperty({
    example: {
      type: 'object' || null,
      $ref: getSchemaPath(Publisher),
      nullable: true,
    },
  })
  @ManyToOne(() => Publisher, (publisher) => publisher.id, { nullable: true })
  @JoinColumn({ name: 'publisher_id' })
  publisherId: Publisher;

  @ApiProperty({
    example: {
      type: 'object',
      $ref: getSchemaPath(Author),
    },
  })
  @ManyToOne(() => Author, (autrhor) => autrhor.id)
  @JoinColumn({ name: 'author_id' })
  authorId: Author;

  @ApiProperty()
  @Column({
    name: 'isbn_code',
    nullable: true,
    unique: true,
  })
  isbnCode: string;

  @ApiProperty()
  @Column({ name: 'pages' })
  pages: number;

  @ApiProperty({
    example: '2023-04-21T14:11:54.000Z',
    description: 'Date of book creation',
    type: 'string',
    format: 'date-time',
  })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({
    example: '2023-04-21T14:11:54.000Z',
    description: 'Date of book last update',
    type: 'string',
    format: 'date-time',
  })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
