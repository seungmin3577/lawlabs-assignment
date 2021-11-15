import { Product } from './entities/product.entity';
import { Connection, EntityRepository, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserGrade, UserRole } from '../users/entities/user.entity';

interface ProductListFindOptions {
  productName?: string;
  userGrade: UserGrade | null;
  userRole: UserRole | null;
}

@Injectable()
@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async findAll({ productName, userGrade, userRole }: ProductListFindOptions) {
    const query = await this.createQueryBuilder('product').select([
      'product_id as productId',
      'product_name as productName',
      'product_price as productPrice',
      'product_stock as productStock',
      'created_at as createdAt',
      'updated_at as updatedAt',
    ]);

    if (userRole === UserRole.회원) {
      if (userGrade === UserGrade.중요회원) {
        query
          .addSelect('discount_rate as discountRate')
          .where(`product.allow_grade = :userGrade`, { userGrade })
          .orWhere(`product.allow_grade = :userGrade`, { userGrade });
      } else {
        query.where(`product.allow_grade = :userGrade`, { userGrade });
      }

      if (productName) {
        query.andWhere(`product.product_name = :productName`, { productName });
      }

      return await query.getMany();
    }
  }
}

export const ProductRepositoryProviders = [
  {
    providers: [ProductRepository],
    inject: ['DatabaseConnection'],
    provide: 'ProductRepository',
    useFactory: async (connection: Connection) => {
      return connection.getCustomRepository(ProductRepository);
    },
  },
];
