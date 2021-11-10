import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
} from '@nestjs/common';
import { UpdateUserDto, UserId } from './dtos/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(200)
  findUsers(): Promise<User[]> {
    return this.usersService.findUsers();
  }

  @Get(':userId')
  @HttpCode(200)
  findUserById(@Param() userId: UserId): Promise<User> {
    return this.usersService.findUserById({ ...userId });
  }

  @Patch(':userId')
  @HttpCode(200)
  updateUser(@Param() userId: UserId, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser({ ...userId, ...updateUserDto });
  }

  @Delete(':userId')
  @HttpCode(204)
  deleteUser(@Param() userId: UserId): void {
    this.usersService.deleteUser({ ...userId });
    return;
  }
}
