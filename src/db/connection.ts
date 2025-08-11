import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import * as schema from './schema/schema';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = process.env.DB_PATH || 'database.sqlite';
const sqlite = new Database(dbPath);

// Включение WAL режима для лучшей производительности
// sqlite.pragma('journal_mode = WAL');

// Создание экземпляра Drizzle
export const db = drizzle(sqlite, { schema });

// Функция для запуска миграций
export const runMigrations = async () => {
  try {
    const migrationsPath = path.join(__dirname, '../../drizzle');

     // Создаем папку миграций, если не существует
    // if (!fs.existsSync(migrationsPath)) {
    //   fs.mkdirSync(migrationsPath, { recursive: true });
    //   console.log(' Created migrations directory');
    // }

    await migrate(db, { migrationsFolder: migrationsPath });
    console.log('Migrations completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  }

};

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Путь к директории с базой данных
// const dataDir = path.join(__dirname, '../../data');
// const dbPath = path.join(dataDir, 'database.sqlite');

// // Создаем папку data, если она не существует
// if (!fs.existsSync(dataDir)) {
//   fs.mkdirSync(dataDir, { recursive: true });
//   console.log('Created data directory');
// }

// const sqlite = new Database(dbPath);
// export const initializeTables = () => {
//   try {
//     // Создание таблицы пользователей
//     sqlite.exec(`
//       CREATE TABLE IF NOT EXISTS users (
//         id TEXT PRIMARY KEY,
//         name TEXT NOT NULL,
//         bio TEXT,
//         email TEXT UNIQUE,
//         created_at TEXT DEFAULT CURRENT_TIMESTAMP,
//         updated_at TEXT DEFAULT CURRENT_TIMESTAMP
//       )
//     `);

//     // Создание индексов
//     sqlite.exec(`
//       CREATE INDEX IF NOT EXISTS idx_users_name ON users(name);
//       CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
//       CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);
//     `);

//     console.log('Tables initialized successfully');
//   } catch (error) {
//     console.error('Table initialization failed:', error);
//     throw error;
//   }
// };


// Закрытие соединения при завершении процесса
process.on('exit', () => sqlite.close());
process.on('SIGHUP', () => process.exit(128 + 1));
process.on('SIGINT', () => process.exit(128 + 2));
process.on('SIGTERM', () => process.exit(128 + 15));
