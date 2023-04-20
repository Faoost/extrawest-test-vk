import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';
import Book from '../entities/book.entity';
import BookLogs from 'additional-entities/book-logs.entity';
import { BookLogTypeEnum } from 'additional-entities/enum/book-logs.enum';

@EventSubscriber()
export class BookSubscriber implements EntitySubscriberInterface<Book> {
  entitiesBeforeUpdate = {};
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Book;
  }

  async afterInsert(event: InsertEvent<Book>) {
    const log = event.manager.create(BookLogs);
    log.action = BookLogTypeEnum.INSERT;
    log.entity = JSON.parse(JSON.stringify(event.entity));

    await event.manager.save(log);
  }

  async beforeUpdate(event: UpdateEvent<Book>) {
    const book = await event.manager.findOne(Book, {
      where: { isbnCode: event.entity.isbnCode },
      relations: {
        publisherId: true,
        authorId: true,
      },
    });

    this.entitiesBeforeUpdate[event.entity.isbnCode] = JSON.parse(
      JSON.stringify(book),
    );
  }

  async afterUpdate(event: UpdateEvent<Book>) {
    const storedEntitiy: Book =
      this.entitiesBeforeUpdate[event.entity.isbnCode];

    const log = event.manager.create(BookLogs);
    log.action = BookLogTypeEnum.UPDATE;
    log.entity = JSON.parse(
      JSON.stringify({
        name: storedEntitiy.name,
        authorId: storedEntitiy.authorId,
        publisherId: storedEntitiy.publisherId,
        isbnCode: storedEntitiy.isbnCode,
        pages: storedEntitiy.pages,
      }),
    );
    log.changedTo = JSON.parse(JSON.stringify(event.entity));

    await event.manager.save(log);
    delete this.entitiesBeforeUpdate[event.entity.isbnCode];
  }

  async beforeRemove(event: RemoveEvent<Book>) {
    const log = event.manager.create(BookLogs);
    const book = await event.manager.findOne(Book, {
      where: { isbnCode: event.entity.isbnCode },
      relations: {
        publisherId: true,
        authorId: true,
      },
    });

    log.action = BookLogTypeEnum.DELETE;
    log.entity = JSON.parse(JSON.stringify(book));

    await event.manager.save(log);
  }
}
