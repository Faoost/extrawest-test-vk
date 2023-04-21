import Author from './entities/author.entity';

export abstract class AuthorService {
  abstract findAll(): Promise<Author[]>;

  abstract findOne(id: number): Promise<Author | null>;
}
