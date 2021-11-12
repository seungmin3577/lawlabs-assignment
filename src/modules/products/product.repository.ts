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
      'product.productId',
      'product.productName',
      'product.productPrice',
      'product.productStock',
      'product.createdAt',
      'product.updatedAt',
    ]);

    if (userRole === UserRole.회원) {
      if (userGrade === UserGrade.중요회원) {
        query
          .addSelect('product.discountRate')
          .where(`product.allowGrade = :${userGrade}`)
          .orWhere(`product.allowGrade = :${userGrade}`);
      } else {
        query.where(`product.allowGrade = :${userGrade}`);
      }

      if (productName) {
        query.andWhere(`product.productName = :${productName}`);
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
