/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Users } from '../entities/user.entity';

@EventSubscriber()
export class UsersSubscriber implements EntitySubscriberInterface<Users> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Users;
  }

  beforeInsert(event: InsertEvent<Users>): void | Promise<any> {
    console.log('BEFORE USER INSERTER: ', event.entity);
  }
}
