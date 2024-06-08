/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Snippet } from '../entities/snippet.entity';

@EventSubscriber()
export class SnippetSubscriber implements EntitySubscriberInterface<Snippet> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Snippet;
  }

  beforeInsert(event: InsertEvent<Snippet>): void | Promise<any> {
    console.log('BEFORE SNIPPET INSERTER: ', event.entity);
  }
}
