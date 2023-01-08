import { DataSource, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import { Snippets } from '../entities/snippet.entity';
export declare class SnippetSubscriber implements EntitySubscriberInterface<Snippets> {
    constructor(dataSource: DataSource);
    listenTo(): typeof Snippets;
    beforeInsert(event: InsertEvent<Snippets>): void | Promise<any>;
}
