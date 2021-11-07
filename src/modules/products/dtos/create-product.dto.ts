import { PickType } from '@nestjs/mapped-types';
import { Product } from '../entities/product.entity';

export class CreateProductDto extends PickType(Product, [
  'productName',
  'productPrice',
  'productStock',
] as const) {}
