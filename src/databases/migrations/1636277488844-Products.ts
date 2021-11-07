import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Products1636277488844 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('=====Run Product Migration=====');
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'product_id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
          },
          {
            name: 'product_name',
            type: 'varchar',
            length: '767',
            isUnique: true,
          },
          {
            name: 'product_price',
            type: 'int',
          },
          {
            name: 'product_stock',
            type: 'int',
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

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
