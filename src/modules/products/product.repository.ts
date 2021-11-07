import { Product } from './entities/product.entity';
import { Connection, EntityRepository, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {}

export const ProductRepositoryProviders = [
  {
    providers: [ProductRepository],
    inject: ['DatabaseConnection'],
    provide: 'productRepository',
    useFactory: async (connection: Connection) => {
      return connection.getCustomRepository(ProductRepository);
    },
  },
];
