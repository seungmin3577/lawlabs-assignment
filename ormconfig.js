const path = require('path');

module.exports = {
  type: 'mysql',
  host: process.env.DATABASE_HOST ?? '127.0.0.1',
  port: +process.env.DATABASE_PORT ?? 3306,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [path.join(__dirname, 'src/**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, 'src/databases/migrations/*{.ts,.js}')],
  migrationsRun: true,
  cli: {
    migrationsDir: path.join(__dirname, 'src/databases/migrations'),
  },
  synchronize: false,
  logging: true,
};
