import { registerAs } from '@nestjs/config';
import { ConnectionOptions } from 'typeorm';
import * as path from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { config } from 'dotenv';

config();

interface AuthConfigurations {
  jwtAccessSecret: string;
  jwtRefreshSecret: string;
}

const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;

export const databaseConfig = registerAs('auth', () => {
  return {
    jwtAccessSecret: JWT_ACCESS_SECRET,
    jwtRefreshSecret: JWT_REFRESH_SECRET,
  } as AuthConfigurations;
});
