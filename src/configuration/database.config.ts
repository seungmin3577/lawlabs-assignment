import { registerAs } from '@nestjs/config';
import { ConnectionOptions } from 'typeorm';
import * as path from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { config } from 'dotenv';

config();

interface TypeOrmConfigurations {
  connection: ConnectionOptions;
}

const {
  NODE_ENV,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,
} = process.env;

export const databaseConfig = registerAs('database', () => {
  return {
    connection: {
      name: 'connection',
      type: 'mysql',
      host: DATABASE_HOST ?? '127.0.0.1',
      port: DATABASE_PORT ?? 3306,
      username: DATABASE_USER,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME,
      entities: [path.join(__dirname, '../**/*.entity{.ts,.js}')],
      migrations: [path.join(__dirname, '../**/*.migration.{.ts,.js}')],
      cli: {
        migrationsDir: path.join(__dirname, '../databases/migrations'),
      },
      // synchronize: NODE_ENV === 'prod' ? false : true,
      logging: true,
      namingStrategy: new SnakeNamingStrategy(),
    },
  } as TypeOrmConfigurations;
});
