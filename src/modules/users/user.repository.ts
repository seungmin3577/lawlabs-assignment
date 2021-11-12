import { User } from './entities/user.entity';
import { Connection, EntityRepository, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
@EntityRepository(User)
export class UserRepository extends Repository<User> {}

export const UserRepositoryProviders = [
  {
    providers: [UserRepository],
    inject: ['DatabaseConnection'],
    provide: 'UserRepository',
    useFactory: async (connection: Connection) => {
      return connection.getCustomRepository(UserRepository);
    },
  },
];
