/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Snippets } from '../entities/snippet.entity';

@EventSubscriber()
export class SnippetSubscriber implements EntitySubscriberInterface<Snippets> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Snippets;
  }

  beforeInsert(event: InsertEvent<Snippets>): void | Promise<any> {
    console.log('BEFORE SNIPPET INSERTER: ', event.entity);
  }
}
