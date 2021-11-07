import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

declare global {
  namespace Express {
    interface Request {
      account: {
        id: number;
      };
    }
  }
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  await app.listen(3000);
}
bootstrap();
