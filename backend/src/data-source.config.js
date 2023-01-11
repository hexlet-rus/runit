"use strict";
exports.__esModule = true;
var dotenv_1 = require("dotenv");
var user_entity_1 = require("./entities/user.entity");
var snippet_entity_1 = require("./entities/snippet.entity");
var _1663236009774_migration_1 = require("./migrations/1663236009774-migration");
exports["default"] = (function () {
    (0, dotenv_1.config)();
    switch (process.env.NODE_ENV) {
        case 'production':
            return {
                type: 'postgres',
                username: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD,
                port: Number(process.env.DATABASE_PORT),
                url: process.env.DATABASE_URL,
                ssl: { rejectUnauthorized: false },
                entities: ["".concat(__dirname, "/entities/*.entity.{ts,js}")],
                migrations: [_1663236009774_migration_1.migration1663236009774]
            };
        case 'test':
            return {
                type: 'sqlite',
                database: ':memory:',
                synchronize: true,
                entities: [user_entity_1.Users, snippet_entity_1.Snippets],
                migrations: [_1663236009774_migration_1.migration1663236009774]
            };
        default:
            return {
                type: 'sqlite',
                database: 'runit.sqlite',
                entities: [user_entity_1.Users, snippet_entity_1.Snippets],
                migrations: [_1663236009774_migration_1.migration1663236009774]
            };
    }
});
