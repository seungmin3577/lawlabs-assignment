import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserGrade, UserRole } from './modules/users/entities/user.entity';
import { HttpExceptionFilter } from './filters/HttpExceptionFilter';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'express';
import * as helmet from 'helmet';

declare global {
  namespace Express {
    interface Request {
      account: {
        id: number;
        role: UserRole;
        grade?: UserGrade;
      };
    }
  }
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(json());
  app.use(helmet());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
