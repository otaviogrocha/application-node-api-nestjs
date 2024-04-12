import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class MasterConnection implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            database: process.env.DATABASE_NAME,
            host: process.env.DATABASE_HOST,
            password: process.env.DATABASE_PASSWORD,
            port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT, 10) : undefined,
            username: process.env.DATABASE_USERNAME,
            entities: ['dist/**/*.entity{.ts,.js}'],
            migrations: ['dist/src/db/migrations/*.js'],
            logging: false,
            name: 'master',
            migrationsRun: false,
        };
    }
}

@Injectable()
export class Connection implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            database: 'test',
            migrationsRun: true,
            name: undefined,
        };
    }
}