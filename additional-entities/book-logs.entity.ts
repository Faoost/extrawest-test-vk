import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookLogTypeEnum } from './enum/book-logs.enum';
import { IsEnum } from 'class-validator';

@Entity('book_logs')
export default class BookLogs {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  id: number;

  @Column({ name: 'name' })
  @IsEnum(BookLogTypeEnum)
  action: BookLogTypeEnum;

  @Column({ name: 'entity', type: 'json' })
  entity: JSON;

  @Column({ name: 'changed_to', type: 'json', nullable: true })
  changedTo: JSON;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
