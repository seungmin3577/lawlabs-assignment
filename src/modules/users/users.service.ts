import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { NOT_EXIST_USER_ERROR_MESSAGE } from 'src/constants/exception-messages';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User, UserId } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserRepository') private userRepository: UserRepository,
  ) {}

  createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.save(createUserDto);
  }

  findUserByEmail({ email }: { email: string }): Promise<User | undefined> {
    return this.userRepository.findOne({ email });
  }

  findUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  findUserById({ userId }: UserId): Promise<User | undefined> {
    return this.userRepository.findOne(userId);
  }

  async updateUser({
    userId,
    grade,
    refreshToken,
    role,
  }: UserId & UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ userId });
    if (!user) throw new BadRequestException(NOT_EXIST_USER_ERROR_MESSAGE);

    if (grade) user.grade = grade;
    if (refreshToken) user.refreshToken = refreshToken;
    if (role) user.role = role;

    return await this.userRepository.save(user);
  }

  async deleteUser({ userId }: UserId): Promise<User> {
    const user = await this.userRepository.findOne({ userId });
    if (!user) throw new BadRequestException(NOT_EXIST_USER_ERROR_MESSAGE);

    return await this.userRepository.softRemove(user);
  }
}
