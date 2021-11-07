import { createConnection, ConnectionOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';

const { NODE_ENV } = process.env;

export const databaseProviders = [
  {
    inject: [ConfigService],
    provide: 'databaseConnection',
    useFactory: async (configService: ConfigService) => {
      const env =
        NODE_ENV === 'prod'
          ? 'database.connectionsProd'
          : 'database.connectionsDev';
      return await createConnection(
        configService.get(env) as ConnectionOptions,
      );
    },
  },
];
