import { Product } from 'src/modules/products/entities/product.entity';
import { User, UserGrade } from 'src/modules/users/entities/user.entity';
import {
  getRepository,
  MigrationInterface,
  QueryRunner,
  Repository,
  Table,
} from 'typeorm';

export class Products1636277488844 implements MigrationInterface {
  public getRepository(): Repository<Product> {
    return getRepository<Product>(Product, 'connection');
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    const repository = await this.getRepository();

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
            name: 'allow_grade',
            type: 'enum',
            enum: ['GENERAL', 'IMPORTANT'],
            isNullable: null,
          },
          {
            name: 'discount_rate',
            type: 'float',
            default: 0,
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

    const product_01 = await repository.create({
      productName: '상품 1',
      productPrice: 100000,
      productStock: 5,
      discountRate: 5.5,
      allowGrade: UserGrade.중요회원,
    });

    const product_02 = await repository.create({
      productName: '상품 2',
      productPrice: 50000,
      productStock: 0,
      allowGrade: UserGrade.일반회원,
    });

    const product_03 = await repository.create({
      productName: '상품 3',
      productPrice: 30000,
      productStock: 2,
      discountRate: 0,
      allowGrade: UserGrade.일반회원,
    });

    const product_04 = await repository.create({
      productName: '상품 4',
      productPrice: 2000,
      productStock: 5,
      discountRate: 5,
      allowGrade: UserGrade.일반회원,
    });

    await repository.save([product_01, product_02, product_03, product_04]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
