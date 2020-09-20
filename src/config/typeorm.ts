import path from 'path'
import 'dotenv/config'

import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.PORT) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [path.resolve(__dirname, '../**/*.entity.{ts,js}')]
    // migrations: [path.resolve(__dirname, '../migrations/**.{ts,js}')],
    // subscribers: [path.resolve(__dirname, '../subscriber/**.{ts,js}')],
    // cli: {
    //     entitiesDir: path.resolve(__dirname, '../entity'),
    //     migrationsDir: path.resolve(__dirname, '../migrations'),
    //     subscribersDir: path.resolve(__dirname, '../subscriber')
    // }
}