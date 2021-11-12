import { registerAs } from '@nestjs/config';
import { config } from 'dotenv';

config();

interface AuthConfigurations {
  jwtAccessSecret: string;
  jwtRefreshSecret: string;
}

const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;

export const authConfig = registerAs('auth', () => {
  return {
    jwtAccessSecret: JWT_ACCESS_SECRET,
    jwtRefreshSecret: JWT_REFRESH_SECRET,
  } as AuthConfigurations;
});
