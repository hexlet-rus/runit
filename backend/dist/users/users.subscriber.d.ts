import { DataSource, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import { Users } from '../entities/user.entity';
export declare class UsersSubscriber implements EntitySubscriberInterface<Users> {
    constructor(dataSource: DataSource);
    listenTo(): typeof Users;
    beforeInsert(event: InsertEvent<Users>): void | Promise<any>;
}
