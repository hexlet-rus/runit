import Database from 'better-sqlite3';
import * as schema from './schema/schema';
export declare const db: import("drizzle-orm/better-sqlite3").BetterSQLite3Database<typeof schema> & {
    $client: Database.Database;
};
export declare const runMigrations: () => Promise<void>;
