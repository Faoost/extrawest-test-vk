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
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @ManyToOne(() => Publisher, (publisher) => publisher.id, { nullable: true })
  @JoinColumn({ name: 'publisher_id' })
  publisherId: Publisher;

  @ManyToOne(() => Author, (autrhor) => autrhor.id)
  @JoinColumn({ name: 'author_id' })
  authorId: Author;

  @Column({
    name: 'isbn_code',
    nullable: true,
    unique: true,
  })
  isbnCode: string;

  @Column({ name: 'pages' })
  pages: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
