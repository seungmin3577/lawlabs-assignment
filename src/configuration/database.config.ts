import { registerAs } from '@nestjs/config';
import { ConnectionOptions } from 'typeorm';
import * as path from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

interface TypeOrmConfigurations {
  connectionDev: ConnectionOptions;
  connectionProd: ConnectionOptions;
}

const {
  NODE_ENV,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,
} = process.env;

export const databaseConfig = registerAs(
  'database',
  () =>
    ({
      connectionDev: {
        name: 'connection',
        type: 'mysql',
        host: DATABASE_HOST ?? '127.0.0.1',
        port: DATABASE_PORT ?? 3306,
        username: DATABASE_USER,
        password: DATABASE_PASSWORD,
        database: DATABASE_NAME,
        entities: [path.join(__dirname, '../**/*.entity{.ts,.js}')],
        migrations: [
          path.join(__dirname, '../databases/migrations/*{.ts,.js}'),
        ],
        cli: {
          migrationsDir: path.join(__dirname, '../databases/migrations'),
        },
        synchronize: true,
        logging: true,
        namingStrategy: new SnakeNamingStrategy(),
      },
      connectionProd: {
        name: 'connection',
        type: 'mysql',
        host: DATABASE_HOST ?? '127.0.0.1',
        port: DATABASE_PORT ?? 3306,
        username: DATABASE_USER,
        password: DATABASE_PASSWORD,
        database: DATABASE_NAME,
        entities: [path.join(__dirname, '../**/*.entity{.ts,.js}')],
        synchronize: false,
        migrations: [
          path.join(__dirname, '../databases/migrations/*{.ts,.js}'),
        ],
        cli: {
          migrationsDir: path.join(__dirname, '../databases/migrations'),
        },
        logging: true,
        namingStrategy: new SnakeNamingStrategy(),
      },
    } as TypeOrmConfigurations),
);
