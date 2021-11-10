import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { DatabaseModule } from 'src/databases/database.module';
import { UserRepositoryProviders } from '../users/user.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService, ...UserRepositoryProviders],
})
export class AuthModule {}
