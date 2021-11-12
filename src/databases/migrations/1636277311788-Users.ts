import { User, UserRole } from 'src/modules/users/entities/user.entity';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  Repository,
  getRepository,
} from 'typeorm';

export class Users1636277311788 implements MigrationInterface {
  public getRepository(): Repository<User> {
    return getRepository<User>(User, 'connection');
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    const repository = await this.getRepository();

    console.log('=====Run User Migration=====');
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'user_id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
          },
          {
            name: 'email',
            type: 'varchar',
            length: '767',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '767',
          },
          {
            name: 'user_role',
            type: 'enum',
            enum: ['ADMIN', 'USER'],
          },
          {
            name: 'user_grade',
            type: 'enum',
            enum: ['GENERAL', 'IMPORTANT'],
            isNullable: true,
          },
          {
            name: 'refresh_token',
            type: 'varchar',
            length: '767',
            isNullable: true,
            default: null,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            default: null,
          },
        ],
      }),
    );

    const superUser = await repository.create({
      email: 'admin@admin.co.kr',
      password: 'admin',
      role: UserRole.관리자,
    });

    await repository.save(superUser);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
