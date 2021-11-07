import { User } from 'src/modules/users/entities/user.entity';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Users1636277311788 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
