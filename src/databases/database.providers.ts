import { createConnection, ConnectionOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    inject: [ConfigService],
    provide: 'DatabaseConnection',
    useFactory: async (configService: ConfigService) => {
      const connectionOptions: ConnectionOptions = configService.get(
        'database.connection',
      );
      return await createConnection(connectionOptions);
    },
  },
];
