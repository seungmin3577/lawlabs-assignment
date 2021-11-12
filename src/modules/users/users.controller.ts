import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from 'src/common/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User, UserId, UserRole } from './entities/user.entity';
import { UsersService } from './users.service';

@UseGuards(RolesGuard)
@Roles(UserRole.관리자)
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

  @Post()
  @HttpCode(201)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
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
