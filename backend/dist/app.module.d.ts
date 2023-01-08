import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { DataSource } from 'typeorm';
export declare class AppModule implements NestModule {
    private dataSource;
    constructor(dataSource: DataSource);
    configure(consumer: MiddlewareConsumer): void;
}
