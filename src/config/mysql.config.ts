import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";

export const TypeOrmConfigAsync:TypeOrmModuleAsyncOptions = {
    imports:[ConfigModule],
    inject:[ConfigService],

    useFactory:async ():Promise<TypeOrmModuleOptions>=>{
        return {

            type: 'mysql',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT, 10),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            // entities: ['dist/**/*.entity{ .ts,.js}'],
            // migrations: ['dist/src/migration/*{.ts,.js}'],
            // migrationsRun: true,
            // migrationsTableName: 'migrations_TypeORM',

            entities: [__dirname + '/../**/*.entity.{js,ts}'],
            migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
            // cli: {
            // migrationsDir: __dirname + '/../database/migrations',
            // },
            synchronize: false,
            logging: true
        }
    }
}

