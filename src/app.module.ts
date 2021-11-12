import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';

import { databaseConfig } from './configuration/database.config';
import { validate } from './configuration/envValidation.config';
import { DatabaseModule } from './databases/database.module';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';
import { authConfig } from './configuration/auth.config';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, authConfig],
      isGlobal: true,
      validate,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('auth.jwtAccessSecret'),
      }),
    }),
    DatabaseModule,
    UsersModule,
    ProductsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: '/', method: RequestMethod.GET }, 'auth/(.*)')
      .forRoutes('*');
  }
}
