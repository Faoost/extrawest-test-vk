import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Publisher from '../../publishers/entities/publisher.entity';
import Author from '../../authors/entities/author.entity';

@Entity('book')
export default class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Publisher, (publisher) => publisher.id)
  publisherId: Publisher;

  @ManyToOne(() => Author, (autrhor) => autrhor.id)
  authorId: Author;

  @Column()
  isbnCode: string;

  @Column()
  pages: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
