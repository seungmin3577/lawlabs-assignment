import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserGrade, UserRole } from './modules/users/entities/user.entity';
import { HttpExceptionFilter } from './common/http-exception-filter';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'express';
import * as helmet from 'helmet';

declare global {
  namespace Express {
    interface Request {
      user: {
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

  await app.listen(8802);
}
bootstrap();
